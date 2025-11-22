import { app, IpcMainEvent, shell } from "electron";
import path from "path";
import { opendir, writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import dayjs from "dayjs";
import {
  purchaseState,
  TAX_RATE_PERCENT,
  calculateChange,
} from "../common/purchase";
import { CustomerType } from "../common/customerType";

const USER_DATA_PATH = app.getPath("userData");
const TRANSACTIONS_PATH = path.join(USER_DATA_PATH, "Transactions");

const transactionRegex = /transaction_(\d+)_\d+/;

async function getLastTransactionNumber(
  transactionPath: string
): Promise<number> {
  if (!existsSync(transactionPath)) {
    mkdirSync(transactionPath);
  }

  const dir = await opendir(transactionPath);

  let lastNum = 0;

  for await (const dirent of dir) {
    const res = transactionRegex.exec(dirent.name);

    if (!res) {
      continue;
    }

    const current = Number(res[1]);
    if (current > lastNum) {
      lastNum = current;
    }
  }

  return lastNum;
}

export async function writeReceipt(
  _: IpcMainEvent,
  purchase: purchaseState
): Promise<string> {
  const currentTranNumber =
    (await getLastTransactionNumber(TRANSACTIONS_PATH)) + 1;
  const today = dayjs();

  const receiptFileName = `transaction_${currentTranNumber}_${today.format("DDMMYYYY")}.txt`;
  const receiptPath = path.join(TRANSACTIONS_PATH, receiptFileName);

  const productsString = purchase.cart
    .map((p) => {
      const price =
        purchase.customerType === CustomerType.Member
          ? p.memberPrice
          : p.regularPrice;
      return `${p.name}\t\t${p.amount}\t\t$${price}\t\t$${p.amount * price}`;
    })
    .join("\n");

  const itemsSold = purchase.cart
    .map((p) => p.amount)
    .reduce((accum, current) => accum + current, 0);

  const content = `${today.format("MMMM D, YYYY")}
TRANSACTION: ${currentTranNumber}
ITEM\t\tQUANTITY\t\tUNIT PRICE\t\tTOTAL
${productsString}
***************************
TOTAL NUMBER OF ITEMS SOLD: ${itemsSold}
SUB-TOTAL: $${purchase.subtotal}
TAX (${TAX_RATE_PERCENT}%): $${purchase.tax}
TOTAL: $${purchase.total}
CASH: $${purchase.cash}
CHANGE: ${calculateChange(purchase.total, purchase.cash)}
***************************
${purchase.savings && `YOU SAVED $${purchase.savings}!`}`;

  await writeFile(receiptPath, content);

  return receiptPath;
}

export function viewReceipt(_: IpcMainEvent, receiptPath: string) {
  shell.openPath(receiptPath);
}

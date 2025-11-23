import path from "path";
import { open, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { app, IpcMainEvent, dialog, BrowserWindow } from "electron";
import log from "electron-log";

import { Product, TaxStatus } from "@common/product";

const DEFAULT_INVENTORY = `Milk: 5, $3.75, $3.50, Tax-Exempt
Red Bull: 10, $4.30, $4.00, Taxable
Flour: 1, $3.10, $2.75, Tax-Exempt
Cookies: 0, $1.10, $0.75, Tax-Exempt`;

const USER_DATA_PATH = app ? app.getPath("userData") : "";
const INVENTORY_PATH = path.join(USER_DATA_PATH, "inventory.txt");

async function loadProductsFromFile(filePath: string): Promise<Product[]> {
  const products: Product[] = [];

  const file = await open(path.join(filePath));

  for await (const line of file.readLines()) {
    try {
      const product = parseProduct(line);
      if (product) {
        products.push(product);
      }
    } catch (e) {
      log.error(`Failed to parse product\nline: ${line}\nError${e}`);
      continue;
    }
  }

  return products;
}

export async function initInventoryWrapper(): Promise<Product[]> {
  return initInventory(INVENTORY_PATH);
}

export async function initInventory(inventoryPath: string): Promise<Product[]> {
  if (!existsSync(inventoryPath)) {
    try {
      await writeFile(inventoryPath, DEFAULT_INVENTORY);
    } catch (e) {
      log.error("Failed to write default inventory file", e);
      return [];
    }
  }

  return await loadProductsFromFile(inventoryPath);
}

export async function loadInventoryFromTxt(event: IpcMainEvent) {
  const window = BrowserWindow.getAllWindows()[0];

  const filePaths = dialog.showOpenDialogSync(window, {
    buttonLabel: "Load",
    filters: [{ name: "txt files", extensions: ["txt"] }],
    properties: ["openFile"],
    title: "Inventory file",
  });

  if (!filePaths) {
    return;
  }

  const file = filePaths[0];

  const products = await loadProductsFromFile(file);

  await updateInventoryFile(null, products);

  dialog.showMessageBoxSync(window, {
    message: "Inventory updated succesfully!",
  });

  event.sender.reload();
}

export async function updateInventoryFile(
  _: IpcMainEvent,
  products: Product[]
): Promise<void> {
  writeInventoryFile(INVENTORY_PATH, products);
}

export async function writeInventoryFile(
  inventoryPath: string,
  products: Product[]
): Promise<void> {
  try {
    const update = products
      .map(
        (p) =>
          `${p.name}: ${p.amount}, $${p.regularPrice}, $${p.memberPrice}, ${p.taxStatus}`
      )
      .join("\n");
    await writeFile(inventoryPath, update);
  } catch (e) {
    log.error("Failed to update inventory file", e);
  }
}

const productRegex = /(\D+): (\d+), \$(\d+(\.\d+)?), \$(\d+(\.\d+)?), (\D+)$/;

export function parseProduct(line: string): Product {
  const res = productRegex.exec(line);

  if (!res) {
    return undefined;
  }

  const name = res[1];
  const amount = Number(res[2]);
  const regularPrice = Number(res[3]);
  const memberPrice = Number(res[5]);
  const taxStatus = res[7] as TaxStatus;

  return { name, amount, regularPrice, memberPrice, taxStatus };
}

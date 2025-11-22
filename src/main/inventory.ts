import path from "path";
import { open, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { Product, TaxStatus } from "../common/product";
import { app, IpcMainEvent } from "electron";

const DEFAULT_INVENTORY = `Milk: 5, $3.75, $3.50, Tax-Exempt
Red Bull: 10, $4.30, $4.00, Taxable
Flour: 1, $3.10, $2.75, Tax-Exempt
Cookies: 0, $1.10, $0.75, Tax-Exempt`;

const USER_DATA_PATH = app.getPath("userData");
const INVENTORY_PATH = path.join(USER_DATA_PATH, "inventory.txt");

export async function initInventory(): Promise<Product[]> {
  const products: Product[] = [];

  if (!existsSync(INVENTORY_PATH)) {
    try {
      await writeFile(INVENTORY_PATH, DEFAULT_INVENTORY);
    } catch {
      console.error("Failed to write default inventory file");
      return [];
    }
  }

  const file = await open(path.join(USER_DATA_PATH, "inventory.txt"));

  for await (const line of file.readLines()) {
    try {
      const product = parseProduct(line);
      if (product) {
        products.push(product);
      }
    } catch {
      continue;
    }
  }

  return products;
}

export async function updateInventoryFile(
  _: IpcMainEvent,
  products: Product[]
): Promise<void> {
  try {
    const update = products
      .map(
        (p) =>
          `${p.name}: ${p.amount}, $${p.regularPrice}, $${p.memberPrice}, ${p.taxStatus}`
      )
      .join("\n");
    await writeFile(INVENTORY_PATH, update);
  } catch {
    console.error("Failed to update inventory file");
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

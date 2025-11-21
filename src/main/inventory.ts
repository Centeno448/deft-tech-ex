import path from "path";
import { open } from "node:fs/promises";
import { Product, TaxStatus } from "../common/product";

export async function initInventory(): Promise<Product[]> {
  const products: Product[] = [];

  const file = await open(path.join(__dirname, "../inventory.txt"));

  for await (const line of file.readLines()) {
    products.push(parseProduct(line));
  }

  return products;
}

const productRegex = /(\D+): (\d+), \$(\d+\.\d+), \$(\d+\.\d+), (\D+)$/;

export function parseProduct(line: string): Product {
  const res = productRegex.exec(line);
  const name = res[1];
  const amount = Number(res[2]);
  const regularPrice = Number(res[3]);
  const memberPrice = Number(res[4]);
  const taxStatus = res[5] as TaxStatus;

  return { name, amount, regularPrice, memberPrice, taxStatus };
}

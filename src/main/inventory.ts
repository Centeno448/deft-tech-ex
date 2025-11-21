import path from "path";
import { Product, TaxStatus } from "./product";

export function initInventory(): Product[] {
  return [];
}

const productRegex = /(\D+): (\d+), \$(\d+\.\d+), \$(\d+\.\d+), (\D+)$/;

export function parseProduct(line: string): Product {
  const res = productRegex.exec(line);
  const name = res[1];
  const amount = Number(res[2]);
  const regularPrice = Number(res[3]);
  const memberPrice = Number(res[4]);
  const taxStatus = res[5] as TaxStatus;

  return new Product(name, amount, regularPrice, memberPrice, taxStatus);
}

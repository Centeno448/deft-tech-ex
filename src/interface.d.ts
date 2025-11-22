import { Product } from "./common/product";
import { purchaseState } from "./common/purchase";

export interface IProductInventory {
  initInventory: () => Promise<Product[]>;
  updateInventory: (products: Product[]) => Promise<void>;
}

export interface IReceipts {
  emitReceipt: (purchase: purchaseState) => Promise<string>;
  viewReceipt: (receiptPath: string) => Promise<void>;
}

declare global {
  interface Window {
    productInventory: IProductInventory;
    receipts: IReceipts;
  }
}

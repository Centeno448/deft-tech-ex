import { Product } from "@common/product";
import { purchaseState } from "@common/purchase";

export interface IProductInventory {
  initInventory: () => Promise<Product[]>;
  updateInventory: (products: Product[]) => Promise<void>;
  loadInventoryFromFile: () => Promise<void>;
}

export interface IDialog {
  showDialog: (title: string, message: string) => Promise<void>;
  confirmDialog: (title: string, message: string) => Promise<bool>;
}

export interface IReceipts {
  emitReceipt: (purchase: purchaseState) => Promise<string>;
  viewReceipt: (receiptPath: string) => Promise<void>;
  viewTransactionHistory: () => void;
}

declare global {
  interface Window {
    productInventory: IProductInventory;
    receipts: IReceipts;
    dialog: IDialog;
  }
}

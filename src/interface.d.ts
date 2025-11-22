import { Product } from "./common/product";

export interface IProductInventory {
  initInventory: () => Promise<Product[]>;
  updateInventory: (products: Product[]) => Promise<void>;
}

declare global {
  interface Window {
    productInventory: IProductInventory;
  }
}

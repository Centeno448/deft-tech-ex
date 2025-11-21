import { Product } from "./common/product";

export interface IProductInventory {
  initInventory: () => Promise<Product[]>;
}

declare global {
  interface Window {
    productInventory: IProductInventory;
  }
}

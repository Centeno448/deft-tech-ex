// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron/renderer";
import { Product } from "../common/product";
import { purchaseState } from "../common/purchase";

contextBridge.exposeInMainWorld("productInventory", {
  initInventory: () => ipcRenderer.invoke("inventory:init"),
  updateInventory: (products: Product[]) =>
    ipcRenderer.send("inventory:update", products),
});

contextBridge.exposeInMainWorld("receipts", {
  emitReceipt: (purchase: purchaseState) =>
    ipcRenderer.invoke("receipt:emit", purchase),
  viewReceipt: (receiptPath: string) =>
    ipcRenderer.send("receipt:view", receiptPath),
});

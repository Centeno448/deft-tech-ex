// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron/renderer";
import { Product } from "../common/product";

contextBridge.exposeInMainWorld("productInventory", {
  initInventory: () => ipcRenderer.invoke("inventory:init"),
  updateInventory: (products: Product[]) =>
    ipcRenderer.send("inventory:update", products),
});

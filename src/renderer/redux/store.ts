import { configureStore } from "@reduxjs/toolkit";

import { inventorySlice } from "./inventorySlice";
import { purchaseSlice } from "./purchaseSlice";

export const { loadInventory, updateInventory, updatedInventory } =
  inventorySlice.actions;

export const {
  cancelPurchase,
  clearPurchaseCart,
  setPurchaseCustomer,
  addPurchaseProduct,
  removePurchaseProduct,
  payPurchase,
} = purchaseSlice.actions;

export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
    purchase: purchaseSlice.reducer,
  },
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

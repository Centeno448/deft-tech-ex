import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "@common/product";

const inventoryInitialState: {
  products: Product[];
  fileNeedsUpdate: boolean;
} = {
  products: [],
  fileNeedsUpdate: false,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: inventoryInitialState,
  reducers: {
    loadInventory: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateInventory: (state, action: PayloadAction<Product[]>) => {
      for (const product of action.payload) {
        const inventoryIndex = state.products.findIndex(
          (p) => p.name === product.name
        );

        if (inventoryIndex < 0) {
          return;
        }

        state.products[inventoryIndex].amount -= product.amount;
      }
      state.fileNeedsUpdate = true;
    },
    updatedInventory: (state) => {
      state.fileNeedsUpdate = false;
    },
  },
});

import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../common/product";

const inventoryInitialState: { value: Product[] } = {
  value: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: inventoryInitialState,
  reducers: {
    updateInventory: (state, action: PayloadAction<Product[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateInventory } = inventorySlice.actions;

export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
  },
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

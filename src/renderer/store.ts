import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../common/product";
import { CustomerType } from "../common/customerType";

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

const purhcaseInitialState: { cart: Product[]; customerType: CustomerType } = {
  cart: [],
  customerType: undefined,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: purhcaseInitialState,
  reducers: {
    cancelPurchase: (state) => {
      state.cart = [];
      state.customerType = undefined;
    },
    clearPurchaseCart: (state) => {
      state.cart = [];
    },
    setPurchaseCustomer: (state, action: PayloadAction<CustomerType>) => {
      state.customerType = action.payload;
    },
    addPurchaseProduct: (state, action: PayloadAction<Product>) => {
      const cartIndex = state.cart.findIndex(
        (p) => p.name === action.payload.name
      );

      if (cartIndex !== -1) {
        state.cart[cartIndex].amount = action.payload.amount;
      } else {
        state.cart.push(action.payload);
      }
    },
    removePurchaseProduct: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((p) => p.name !== action.payload.name);
    },
  },
});

export const { updateInventory } = inventorySlice.actions;

export const {
  cancelPurchase,
  clearPurchaseCart,
  setPurchaseCustomer,
  addPurchaseProduct,
  removePurchaseProduct,
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

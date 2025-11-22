import {
  createSlice,
  configureStore,
  PayloadAction,
  WritableDraft,
} from "@reduxjs/toolkit";
import { Product } from "../common/product";
import { CustomerType } from "../common/customerType";
import {
  calculateSubTotal,
  calculateTax,
  calculateSavings,
  purchaseState,
} from "../common/purchase";

const inventoryInitialState: { products: Product[]; fileNeedsUpdate: boolean } =
  {
    products: [],
    fileNeedsUpdate: false,
  };

const inventorySlice = createSlice({
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

const purhcaseInitialState: purchaseState = {
  cart: [],
  customerType: undefined,
  subtotal: 0,
  tax: 0,
  total: 0,
  savings: 0,
  cash: 0,
};

function recalculatePurchaseFields(state: WritableDraft<purchaseState>) {
  state.subtotal = calculateSubTotal(state.customerType, state.cart);
  state.tax = calculateTax(state.customerType, state.cart);
  state.savings = calculateSavings(state.customerType, state.cart);
  state.total = +(state.subtotal + state.tax).toFixed(2);
}

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: purhcaseInitialState,
  reducers: {
    cancelPurchase: (state) => {
      state.cart = [];
      state.customerType = undefined;
      state.savings = 0;
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
      state.cash = 0;
    },
    clearPurchaseCart: (state) => {
      state.cart = [];
      recalculatePurchaseFields(state);
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

      recalculatePurchaseFields(state);
    },
    removePurchaseProduct: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((p) => p.name !== action.payload.name);
      recalculatePurchaseFields(state);
    },
    payPurchase: (state, action: PayloadAction<number>) => {
      state.cash = action.payload;
    },
  },
});

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

import { createSlice, PayloadAction, WritableDraft } from "@reduxjs/toolkit";

import {
  purchaseState,
  calculateSavings,
  calculateSubTotal,
  calculateTax,
} from "@common/purchase";
import { Product } from "@common/product";
import { CustomerType } from "@common/customerType";

const purchaseInitialState: purchaseState = {
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

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: purchaseInitialState,
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

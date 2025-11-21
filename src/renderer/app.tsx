import React from "react";
import { createRoot } from "react-dom/client";
import QMart from "./qmart";
import { BrowserRouter, Route, Routes } from "react-router";
import Membership from "./Membership";
import Cart from "./Cart";
import Checkout from "./Checkout";
import PurchaseLayout from "./PurchaseLayout";
import { INDEX_ROUTE } from "./indexRoute";
import { Provider } from "react-redux";
import { store } from "./store";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={INDEX_ROUTE} element={<QMart />} />
        <Route path="purchase" element={<PurchaseLayout />}>
          <Route path="membership" element={<Membership />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

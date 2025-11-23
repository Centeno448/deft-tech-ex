import React from "react";
import { createRoot } from "react-dom/client";
import QMart from "./QMart";
import { HashRouter, Route, Routes } from "react-router";
import Membership from "./Membership";
import Cart from "./Cart";
import Checkout from "./Checkout";
import PurchaseLayout from "./PurchaseLayout";
import { Provider } from "react-redux";
import { store } from "./store";
import PurchaseComplete from "./PurchaseComplete";
import "./App.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<QMart />} />
        <Route path="purchase" element={<PurchaseLayout />}>
          <Route path="membership" element={<Membership />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="complete" element={<PurchaseComplete />} />
      </Routes>
    </HashRouter>
  </Provider>
);

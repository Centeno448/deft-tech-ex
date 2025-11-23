import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router";

import { store } from "@store";
import QMart from "./QMart";
import Membership from "./Purchase/Membership";
import Cart from "./Purchase/Cart/Cart";
import Checkout from "./Purchase/Checkout";
import PurchaseLayout from "./Purchase/PurchaseLayout";
import PurchaseComplete from "./Purchase/PurchaseComplete";

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

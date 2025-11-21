import React from "react";
import { createRoot } from "react-dom/client";
import QMart from "./qmart";
import { BrowserRouter, Route, Routes } from "react-router";
import Purchase from "./Purchase";
import PurchaseLayout from "./PurchaseLayout";
import { INDEX_ROUTE } from "./indexRoute";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={INDEX_ROUTE} element={<QMart />} />
      <Route path="purchase" element={<PurchaseLayout />}>
        <Route path="membership" element={<Purchase />} />
        <Route path="cart" element={<Purchase />} />
        <Route path="checkout" element={<Purchase />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

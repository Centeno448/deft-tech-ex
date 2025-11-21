import React from "react";
import { createRoot } from "react-dom/client";
import QMart from "./qmart";
import { BrowserRouter, Route, Routes } from "react-router";
import Puchase from "./Purchase";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/main_window/index.html" element={<QMart />} />
      <Route path="/purchase" element={<Puchase />} />
    </Routes>
  </BrowserRouter>
);

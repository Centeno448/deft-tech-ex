import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { updateInventory } from "./store";
import { Link } from "react-router";
import "./qmart.scss";

export default function QMart() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initInv = async () => {
      const products = await window.productInventory.initInventory();
      dispatch(updateInventory(products));
    };
    initInv();
  }, []);

  return (
    <div className="container">
      <h1>Quick Mart</h1>

      <Link to="/purchase/membership">
        <button>New Purchase</button>
      </Link>
    </div>
  );
}

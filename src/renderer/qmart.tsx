import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { loadInventory } from "./store";
import { Link } from "react-router";
import "./QMart.scss";

export default function QMart() {
  const dispatch = useAppDispatch();
  const storeProducts = useAppSelector((s) => s.inventory.value);

  useEffect(() => {
    const initInv = async () => {
      if (!storeProducts.length) {
        const products = await window.productInventory.initInventory();
        dispatch(loadInventory(products));
      }
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

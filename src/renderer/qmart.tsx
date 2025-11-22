import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { loadInventory, updatedInventory } from "./store";
import { Link } from "react-router";
import "./QMart.scss";

export default function QMart() {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((s) => s.inventory);

  useEffect(() => {
    const syncInv = async () => {
      if (!inventory.products.length) {
        // No inventory in memory, load from file
        const products = await window.productInventory.initInventory();
        dispatch(loadInventory(products));
      }

      if (inventory.fileNeedsUpdate) {
        // recent changes require file update
        await window.productInventory.updateInventory(inventory.products);
        dispatch(updatedInventory());
      }
    };

    syncInv();
  }, []);

  const handleInventoryLoad = async () => {
    await window.productInventory.loadInventoryFromFile();
  };

  return (
    <div className="container">
      <h1>Quick Mart</h1>

      <div className="btnContainer">
        <Link to="/purchase/membership">
          <button className="btn primary">New Purchase</button>
        </Link>

        <button className="btn primary" onClick={handleInventoryLoad}>
          Load Inventory
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Product } from "../common/product";
import { Link } from "react-router";
import "./qmart.scss";

export default function QMart() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const initInv = async () => {
      const res = await window.productInventory.initInventory();
      setProducts(res);
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

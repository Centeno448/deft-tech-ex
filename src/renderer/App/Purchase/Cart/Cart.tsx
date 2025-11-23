import { Link } from "react-router";

import { useAppSelector } from "@hooks";
import CartTable from "./CartTable";
import ProductTable from "./Product/ProductTable";
import "./Cart.scss";

export default function Membership() {
  const productsInInventory = useAppSelector((s) => s.inventory.products);
  const productsInCart = useAppSelector((s) => s.purchase.cart);

  return (
    <>
      <p className="label">Add products to the cart</p>

      <div className="tableContainers">
        <ProductTable products={productsInInventory} />

        <CartTable summaryMode={false} products={productsInCart} />
      </div>

      <Link to="/purchase/checkout">
        <button className="btn primary" disabled={!productsInCart.length}>
          Checkout
        </button>
      </Link>
    </>
  );
}

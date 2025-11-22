import { Link } from "react-router";
import { useAppSelector } from "./hooks";
import "./Cart.scss";
import CartTable from "./CartTable";
import ProductTable from "./ProductTable";

export default function Membership() {
  const productsInInventory = useAppSelector((s) => s.inventory.value);
  const productsInCart = useAppSelector((s) => s.purchase.cart);

  return (
    <>
      <p>Add products to the cart</p>

      <div className="tableContainers">
        <ProductTable products={productsInInventory} />

        <CartTable summaryMode={false} products={productsInCart} />
      </div>

      <Link to="/purchase/checkout">
        <button disabled={!productsInCart.length}>Checkout</button>
      </Link>
    </>
  );
}

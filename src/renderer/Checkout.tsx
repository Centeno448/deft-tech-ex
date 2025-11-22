import { Link, useNavigate } from "react-router";
import CartTable from "./CartTable";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useState, ChangeEvent } from "react";
import { clearPurchaseCart, updateInventory } from "./store";
import { INDEX_ROUTE } from "./indexRoute";

export default function Checkout() {
  const [cash, setCash] = useState(0);

  const purchase = useAppSelector((s) => s.purchase);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCashInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCash(Number(event.target.value));
  };

  const handlePayment = () => {
    if (cash < purchase.total) {
      // TODO: MIGRATE TO ELECTRON DIALOG
      alert(`Customer must pay $${purchase.total}`);
      return;
    }

    dispatch(updateInventory(purchase.cart));
    dispatch(clearPurchaseCart());
    navigate(INDEX_ROUTE);
  };

  return (
    <>
      <p>Checkout</p>

      <Link to={"/purchase/cart"}>
        <button>Back to cart</button>
      </Link>

      <CartTable summaryMode={true} products={purchase.cart} />

      <label>
        Customer cash payment:{" "}
        <input
          type="number"
          defaultValue={cash}
          min={0}
          onChange={handleCashInput}
        />
      </label>

      <button onClick={handlePayment}>Confirm Payment</button>
    </>
  );
}

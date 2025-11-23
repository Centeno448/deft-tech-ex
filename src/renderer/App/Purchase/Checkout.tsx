import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";

import CartTable from "./Cart/CartTable";
import { useAppDispatch, useAppSelector } from "@hooks";
import { payPurchase, updateInventory } from "@store";
import "./Checkout.scss";

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
      window.dialog.showDialog(
        "Invalid cash amount",
        `Customer must pay $${purchase.total}`
      );
      return;
    }

    dispatch(payPurchase(cash));
    dispatch(updateInventory(purchase.cart));
    navigate("/complete");
  };

  return (
    <>
      <p className="label">Checkout</p>

      <CartTable summaryMode={true} products={purchase.cart} />

      <div className="checkoutInputContainer">
        <label>Customer cash payment:</label>
        <input
          className="checkoutInput"
          type="number"
          defaultValue={cash}
          min={0}
          onChange={handleCashInput}
        />
      </div>

      <div className="checkoutBtnContainer">
        <Link to={"/purchase/cart"}>
          <button className="btn secondary">Back to cart</button>
        </Link>
        <button className="btn primary" onClick={handlePayment}>
          Confirm Payment
        </button>
      </div>
    </>
  );
}

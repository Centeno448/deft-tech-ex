import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { clearPurchaseCart } from "./store";
import { Link } from "react-router";
import "./PurchaseComplete.scss";

export default function PurchaseComplete() {
  const [isReady, setIsReady] = useState(false);
  const [receipt, setReceipt] = useState("");
  const dispatch = useAppDispatch();
  const purchase = useAppSelector((s) => s.purchase);

  useEffect(() => {
    const printReceipt = async () => {
      const receiptPath = await window.receipts.emitReceipt(purchase);
      setReceipt(receiptPath);
      dispatch(clearPurchaseCart());
      setIsReady(true);
    };

    printReceipt();
  }, []);

  const handleViewReceipt = () => {
    window.receipts.viewReceipt(receipt);
  };

  return (
    <>
      <div className="container">
        <h1>PURCHASE COMPLETE</h1>

        <div className="completeBtnContainer">
          <button
            className="btn secondary"
            onClick={handleViewReceipt}
            disabled={!isReady}
          >
            View Receipt
          </button>

          <Link to="/">
            <button className="btn primary">Back to Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

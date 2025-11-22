import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { clearPurchaseCart } from "./store";
import { Link } from "react-router";
import { INDEX_ROUTE } from "./indexRoute";

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
      <p>PURCHASE COMPLETE</p>

      <button onClick={handleViewReceipt} disabled={!isReady}>
        View Receipt
      </button>

      <Link to={INDEX_ROUTE}>
        <button>Back to home</button>
      </Link>
    </>
  );
}

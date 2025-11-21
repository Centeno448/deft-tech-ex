import { Outlet, Link } from "react-router";
import { INDEX_ROUTE } from "./indexRoute";
import { useNavigate } from "react-router";
import { useAppDispatch } from "./hooks";
import { cancelPurchase } from "./store";

export default function PurchaseLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePurchaseCancel = () => {
    if (confirm("This will clear all purchase data, are you sure?")) {
      dispatch(cancelPurchase());
      navigate(INDEX_ROUTE);
    }
  };

  return (
    <>
      <h2>Purchase</h2>

      <button onClick={handlePurchaseCancel}>Cancel purchase</button>

      <Outlet />
    </>
  );
}

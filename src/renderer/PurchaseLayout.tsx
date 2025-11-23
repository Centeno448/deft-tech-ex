import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useAppDispatch } from "./hooks";
import { cancelPurchase } from "./store";
import "./PurchaseLayout.scss";

export default function PurchaseLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePurchaseCancel = async () => {
    const confirmation = await window.dialog.confirmDialog(
      "Purchase Cancelation",
      "This will clear all purchase data, are you sure?"
    );

    if (confirmation) {
      dispatch(cancelPurchase());
      navigate("/");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Purchase</h1>

        <button className="btn danger cancelBtn" onClick={handlePurchaseCancel}>
          Cancel purchase
        </button>

        <Outlet />
      </div>
    </>
  );
}

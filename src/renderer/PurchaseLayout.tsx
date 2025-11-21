import { Outlet, Link } from "react-router";
import { INDEX_ROUTE } from "./indexRoute";

export default function PurchaseLayout() {
  return (
    <>
      <h2>Purchase</h2>
      <Link to={INDEX_ROUTE}>
        <button>Cancel purchase</button>
      </Link>

      <Outlet />
    </>
  );
}

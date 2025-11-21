import { Outlet, Link } from "react-router";
import { INDEX_ROUTE } from "./indexRoute";

export default function PurchaseLayout() {
  return (
    <>
      <Link to={INDEX_ROUTE}>
        <button>Cancel purchase</button>
      </Link>

      <Outlet />
    </>
  );
}

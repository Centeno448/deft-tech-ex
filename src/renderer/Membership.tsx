import { Link } from "react-router";

export default function Membership() {
  return (
    <>
      <p>Select customer type:</p>
      <Link to="/purchase/cart">
        <button>Rewards Member</button>
      </Link>
      <Link to="/purchase/cart">
        <button>Regular Customer</button>
      </Link>
    </>
  );
}

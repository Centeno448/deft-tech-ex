import { Link } from "react-router";

export default function Membership() {
  return (
    <>
      <p>Add products to the cart</p>

      <Link to="/purchase/Checkout">
        <button>Checkout</button>
      </Link>
    </>
  );
}

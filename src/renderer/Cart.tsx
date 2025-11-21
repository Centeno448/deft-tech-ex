import { Link } from "react-router";
import { useAppSelector } from "./hooks";
import ProductCard from "./ProductCard";
import CartRow from "./CartRow";
import "./Cart.scss";

export default function Membership() {
  const products = useAppSelector((s) => s.inventory.value);
  const productsInCart = useAppSelector((s) => s.purchase.cart);

  return (
    <>
      <p>Add products to the cart</p>

      <div className="tableContainers">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Available</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsInCart.map((p) => (
              <CartRow key={p.name} product={p} />
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/purchase/Checkout">
        <button>Checkout</button>
      </Link>
    </>
  );
}

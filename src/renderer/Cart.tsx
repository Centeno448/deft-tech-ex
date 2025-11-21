import { Link } from "react-router";
import { useAppSelector } from "./hooks";
import ProductCard from "./ProductCard";

export default function Membership() {
  const products = useAppSelector((s) => s.inventory.value);

  return (
    <>
      <p>Add products to the cart</p>

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

      <Link to="/purchase/Checkout">
        <button>Checkout</button>
      </Link>
    </>
  );
}

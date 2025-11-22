import { Link } from "react-router";
import { useAppSelector } from "./hooks";
import ProductCard from "./ProductCard";
import "./Cart.scss";
import CartTable from "./CartTable";

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

        <CartTable products={productsInCart} />
      </div>

      <Link to="/purchase/Checkout">
        <button>Checkout</button>
      </Link>
    </>
  );
}

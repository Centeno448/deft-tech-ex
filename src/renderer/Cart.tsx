import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "./hooks";
import ProductCard from "./ProductCard";
import CartRow from "./CartRow";
import "./Cart.scss";
import { clearPurchaseCart } from "./store";
import { CustomerType } from "../common/customerType";

export default function Membership() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((s) => s.inventory.value);
  const productsInCart = useAppSelector((s) => s.purchase.cart);
  const memberType = useAppSelector((s) => s.purchase.customerType);

  const handleClearCart = () => {
    dispatch(clearPurchaseCart());
  };

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
          <button onClick={handleClearCart}>Clear Cart</button>
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
          subtotal: $
          {productsInCart
            .map((p) =>
              memberType === CustomerType.Member
                ? p.memberPrice * p.amount
                : p.regularPrice * p.amount
            )
            .reduce((accum, curr) => accum + curr, 0)}
        </table>
      </div>

      <Link to="/purchase/Checkout">
        <button>Checkout</button>
      </Link>
    </>
  );
}

import { Product } from "../common/product";
import { clearPurchaseCart } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { CustomerType } from "../common/customerType";
import CartRow from "./CartRow";

export interface CartTableProps {
  products: Product[];
}

export default function CartTable({ products }: CartTableProps) {
  const dispatch = useAppDispatch();
  const memberType = useAppSelector((s) => s.purchase.customerType);

  const handleClearCart = () => {
    dispatch(clearPurchaseCart());
  };
  return (
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
        {products.map((p) => (
          <CartRow key={p.name} product={p} />
        ))}
      </tbody>
      subtotal: $
      {products
        .map((p) =>
          memberType === CustomerType.Member
            ? p.memberPrice * p.amount
            : p.regularPrice * p.amount
        )
        .reduce((accum, curr) => accum + curr, 0)}
    </table>
  );
}

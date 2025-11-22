import { Product } from "../common/product";
import { clearPurchaseCart } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import CartRow from "./CartRow";
import { TAX_RATE_PERCENT } from "../common/purchase";

export interface CartTableProps {
  products: Product[];
  summaryMode: boolean;
}

export default function CartTable({ products, summaryMode }: CartTableProps) {
  const dispatch = useAppDispatch();
  const purchase = useAppSelector((s) => s.purchase);

  const handleClearCart = () => {
    dispatch(clearPurchaseCart());
  };

  return (
    <table>
      {!summaryMode && <button onClick={handleClearCart}>Clear Cart</button>}
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
          <CartRow summaryMode={summaryMode} key={p.name} product={p} />
        ))}
      </tbody>
      <p>Sub-Total: ${purchase.subtotal}</p>
      <p>
        Tax ({TAX_RATE_PERCENT}%): ${purchase.tax}
      </p>
      <p>Total: ${purchase.total}</p>
    </table>
  );
}

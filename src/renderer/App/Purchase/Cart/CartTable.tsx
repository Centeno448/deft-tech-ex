import { Product } from "@common/product";
import { clearPurchaseCart } from "@store";
import { useAppDispatch, useAppSelector } from "@hooks";
import { TAX_RATE_PERCENT } from "@common/purchase";
import CartRow from "./CartRow";
import "./CartTable.scss";

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
    <>
      <div className="cartTableContainer">
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
            {products.map((p) => (
              <CartRow summaryMode={summaryMode} key={p.name} product={p} />
            ))}
          </tbody>
        </table>
        {!summaryMode && (
          <button className="btn warn clearCartBtn" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
        <div className="totalContainer">
          <p className="total">Sub-Total: ${purchase.subtotal}</p>
          <p className="total">
            Tax ({TAX_RATE_PERCENT}%): ${purchase.tax}
          </p>
          <p className="total">Total: ${purchase.total}</p>
        </div>
      </div>
    </>
  );
}

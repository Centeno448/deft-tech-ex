import { CustomerType } from "@common/customerType";
import { Product } from "@common/product";
import { useAppDispatch, useAppSelector } from "@hooks";
import { removePurchaseProduct } from "@store";
import "./CartRow.scss";

export interface CartRowProps {
  product: Product;
  summaryMode: boolean;
}

export default function CartRow({ product, summaryMode }: CartRowProps) {
  const dispatch = useAppDispatch();
  const customerType = useAppSelector((s) => s.purchase.customerType);
  const price =
    customerType === CustomerType.Member
      ? product.memberPrice
      : product.regularPrice;

  const handleRemoveFromCart = () => {
    dispatch(removePurchaseProduct(product));
  };

  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.amount}</td>
        <td>${price}</td>
        <td>${product.amount * price}</td>
        {!summaryMode && (
          <td>
            <button
              className="btn danger removeCartBtn"
              onClick={handleRemoveFromCart}
            >
              Remove
            </button>
          </td>
        )}
      </tr>
    </>
  );
}

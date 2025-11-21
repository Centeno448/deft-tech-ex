import { CustomerType } from "../common/customerType";
import { Product } from "../common/product";
import { useAppDispatch, useAppSelector } from "./hooks";
import { removePurchaseProduct } from "./store";

export interface CartRowProps {
  product: Product;
}

export default function CartRow({ product }: CartRowProps) {
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
        <td>
          <button onClick={handleRemoveFromCart}>Remove From Cart</button>
        </td>
      </tr>
    </>
  );
}

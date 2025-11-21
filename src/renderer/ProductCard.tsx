import { ChangeEvent, useState } from "react";
import { CustomerType } from "../common/customerType";
import { Product } from "../common/product";
import { useAppDispatch, useAppSelector } from "./hooks";
import { addPurchaseProduct } from "./store";

export interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const customerType = useAppSelector((s) => s.purchase.customerType);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const dispatch = useAppDispatch();

  const productInCart = useAppSelector((s) => s.purchase.cart).find(
    (p) => p.name === product.name
  );

  const shouldDisableAddCartButton = productInCart
    ? productInCart.amount === product.amount
    : false;

  const handleAddToCart = () => {
    if (!purchaseAmount) {
      return;
    }

    dispatch(
      addPurchaseProduct({
        ...product,
        amount: purchaseAmount,
      })
    );
  };

  const handlePurchaseAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPurchaseAmount(Number(event.target.value));
  };

  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.amount}</td>
        <td>
          ${customerType === CustomerType.Member
            ? product.memberPrice
            : product.regularPrice}
        </td>
        <td>
          <input
            type="number"
            min={1}
            max={product.amount}
            value={purchaseAmount}
            onChange={handlePurchaseAmountChange}
          />
          <button
            disabled={shouldDisableAddCartButton}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </td>
      </tr>
    </>
  );
}

import { ChangeEvent, useState } from "react";

import { CustomerType } from "@common/customerType";
import { Product } from "@common/product";
import { useAppDispatch, useAppSelector } from "@hooks";
import { addPurchaseProduct } from "@store";
import "./ProductRow.scss";

export interface ProductRowProps {
  product: Product;
}

export default function ProductRow({ product }: ProductRowProps) {
  const customerType = useAppSelector((s) => s.purchase.customerType);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const dispatch = useAppDispatch();

  const productInCart = useAppSelector((s) => s.purchase.cart).find(
    (p) => p.name === product.name
  );

  const shouldDisableInteraction = productInCart
    ? productInCart.amount === product.amount
    : product.amount === 0;

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
    let amount = Number(event.target.value);
    if (amount > product.amount) {
      amount = product.amount;
      event.target.value = `${amount}`;
    }
    setPurchaseAmount(amount);
  };

  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.amount}</td>
        <td>
          $
          {customerType === CustomerType.Member
            ? product.memberPrice
            : product.regularPrice}
        </td>
        <td>
          <div className="cartInputContainer">
            <input
              className="cartInput"
              type="number"
              min={1}
              max={product.amount}
              disabled={shouldDisableInteraction}
              defaultValue={purchaseAmount}
              onChange={handlePurchaseAmountChange}
            />
            <button
              className="btn success cartBtn"
              disabled={shouldDisableInteraction}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

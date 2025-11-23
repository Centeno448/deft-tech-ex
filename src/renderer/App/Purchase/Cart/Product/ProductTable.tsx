import { Product } from "@common/product";
import ProductRow from "./ProductRow";
import "./ProductTable.scss";

export interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <table className="productTable">
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
          <ProductRow key={p.name} product={p} />
        ))}
      </tbody>
    </table>
  );
}

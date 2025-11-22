import { Product, TaxStatus } from "./product";
import { CustomerType } from "./customerType";

export const TAX_RATE_PERCENT = 6.5;
const TAX_RATE = TAX_RATE_PERCENT / 100;

export function calculateSubTotal(
  memberType: CustomerType,
  products: Product[]
): number {
  const priceField =
    memberType === CustomerType.Member ? "memberPrice" : "regularPrice";

  return +products
    .map((p) => p[priceField] * p.amount)
    .reduce((accum, curr) => accum + curr, 0)
    .toFixed(2);
}

export function calculateTax(
  memberType: CustomerType,
  products: Product[]
): number {
  const taxableProducts = products.filter(
    (p) => p.taxStatus === TaxStatus.Taxable
  );

  const subtotal = calculateSubTotal(memberType, taxableProducts);

  return +(subtotal * TAX_RATE).toFixed(2);
}

export function calculateSavings(
  memberType: CustomerType,
  products: Product[]
): number {
  if (memberType === CustomerType.Regular) {
    return 0;
  }

  const membershipTotal =
    calculateSubTotal(CustomerType.Member, products) +
    calculateTax(CustomerType.Member, products);

  const regularTotal =
    calculateSubTotal(CustomerType.Regular, products) +
    calculateTax(CustomerType.Regular, products);

  return +(regularTotal - membershipTotal).toFixed(2);
}

export function calculateChange(total: number, cashPayment: number) {
  return +(cashPayment - total).toFixed(2);
}

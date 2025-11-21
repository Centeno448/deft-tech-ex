export enum TaxStatus {
  TaxExempt = "Tax-Exempt",
  Taxable = "Taxable",
}

export interface Product {
  name: string;
  amount: number;
  regularPrice: number;
  memberPrice: number;
  taxStatus: TaxStatus;
}

export function calculateSavings(product: Product): number {
  return +(product.regularPrice - product.memberPrice).toFixed(2);
}

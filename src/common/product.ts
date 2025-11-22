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

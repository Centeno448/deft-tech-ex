export enum TaxStatus {
  TaxExempt = "Tax-Exempt",
  Taxable = "Taxable",
}

export class Product {
  name: string;
  amount: number;
  regularPrice: number;
  memberPrice: number;
  taxStatus: TaxStatus;

  constructor(
    name: string,
    amount: number,
    regularPrice: number,
    memberPrice: number,
    taxStatus: TaxStatus
  ) {
    this.name = name;
    this.amount = amount;
    this.regularPrice = regularPrice;
    this.memberPrice = memberPrice;
    this.taxStatus = taxStatus;
  }

  calculateSavings(): number {
    return +(this.regularPrice - this.memberPrice).toFixed(2);
  }
}

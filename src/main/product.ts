export enum TaxStatus {
  TaxExempt = "Tax-Exempt",
  Taxable = "Taxable",
}

export class Product {
  private name: string;
  private amount: number;
  private regularPrice: number;
  private memberPrice: number;
  private taxStatus: TaxStatus;

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

  getName() {
    return this.name;
  }

  getTaxStatus() {
    return this.taxStatus;
  }

  getAmount() {
    return this.amount;
  }

  getMemberPrice() {
    return this.memberPrice;
  }

  getRegularPrice() {
    return this.regularPrice;
  }

  calculateSavings(): number {
    return this.regularPrice - this.memberPrice;
  }
}

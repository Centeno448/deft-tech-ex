import { Product, TaxStatus, calculateSavings } from "./product";

describe("Product", () => {
  test("calculates savings correctly", () => {
    const p: Product = {
      name: "a",
      amount: 1,
      regularPrice: 4.75,
      memberPrice: 4.33,
      taxStatus: TaxStatus.TaxExempt,
    };

    expect(calculateSavings(p)).toEqual(0.42);
  });
});

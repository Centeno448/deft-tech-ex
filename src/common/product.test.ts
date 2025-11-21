import { Product, TaxStatus } from "./product";

describe("Product", () => {
  test("calculates savings correctly", () => {
    const p = new Product("a", 1, 4.75, 4.33, TaxStatus.TaxExempt);

    expect(p.calculateSavings()).toEqual(0.42);
  });
});

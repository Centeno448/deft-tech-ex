import { parseProduct } from "./inventory";
import { TaxStatus } from "./product";

describe("parseProduct", () => {
  test("parses correctly with taxable", () => {
    const line = "Red Bull: 10, $4.30, $4.00, Taxable";
    const product = parseProduct(line);

    expect(product.getName()).toEqual("Red Bull");
    expect(product.getAmount()).toEqual(10);
    expect(product.getRegularPrice()).toEqual(4.3);
    expect(product.getMemberPrice()).toEqual(4.0);
    expect(product.getTaxStatus()).toEqual(TaxStatus.Taxable);
  });

  test("parses correctly with tax exempt", () => {
    const line = "Milk: 5, $3.75, $3.50, Tax-Exempt";
    const product = parseProduct(line);

    expect(product.getName()).toEqual("Milk");
    expect(product.getAmount()).toEqual(5);
    expect(product.getRegularPrice()).toEqual(3.75);
    expect(product.getMemberPrice()).toEqual(3.5);
    expect(product.getTaxStatus()).toEqual(TaxStatus.TaxExempt);
  });
});

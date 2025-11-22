import { parseProduct, initInventory } from "./inventory";
import { TaxStatus } from "../common/product";

describe("parseProduct", () => {
  test("parses correctly with taxable", () => {
    const line = "Red Bull: 10, $4.30, $4.00, Taxable";
    const product = parseProduct(line);

    expect(product.name).toEqual("Red Bull");
    expect(product.amount).toEqual(10);
    expect(product.regularPrice).toEqual(4.3);
    expect(product.memberPrice).toEqual(4.0);
    expect(product.taxStatus).toEqual(TaxStatus.Taxable);
  });

  test("parses correctly with tax exempt", () => {
    const line = "Milk: 5, $3.75, $3.50, Tax-Exempt";
    const product = parseProduct(line);

    expect(product.name).toEqual("Milk");
    expect(product.amount).toEqual(5);
    expect(product.regularPrice).toEqual(3.75);
    expect(product.memberPrice).toEqual(3.5);
    expect(product.taxStatus).toEqual(TaxStatus.TaxExempt);
  });
});

describe("initInventory", () => {
  test("loads inventory from file", async () => {
    const products = await initInventory();

    expect(products.length).toEqual(4);
    expect(products[0].name).toEqual("Milk");
    expect(products[1].name).toEqual("Red Bull");
    expect(products[2].name).toEqual("Flour");
  });
});

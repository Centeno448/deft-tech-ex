import { parseProduct, initInventory, writeInventoryFile } from "./inventory";
import { Product, TaxStatus } from "../common/product";
import path from "path";
import { rm } from "fs/promises";

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
    const products = await initInventory(
      path.join(__dirname, "../../tests/fixtures/inventory.txt")
    );

    expect(products.length).toEqual(4);
    expect(products[0].name).toEqual("Milk");
    expect(products[1].name).toEqual("Red Bull");
    expect(products[2].name).toEqual("Flour");
    expect(products[3].name).toEqual("Cookies");
  });
});

describe("writeInventoryFile", () => {
  const tempFile = path.join(
    __dirname,
    "../../tests/fixtures/inventory_updateInventoryFile.txt"
  );

  afterAll(async () => {
    await rm(tempFile);
  });

  test("updates the inventory file", async () => {
    await initInventory(tempFile);

    const updates: Product[] = [
      {
        name: "new",
        amount: 1,
        memberPrice: 1,
        regularPrice: 2,
        taxStatus: TaxStatus.Taxable,
      },
    ];

    await writeInventoryFile(tempFile, updates);
    const products = await initInventory(tempFile);

    expect(products.length).toBe(1);
    expect(products[0].name).toEqual("new");
  });
});

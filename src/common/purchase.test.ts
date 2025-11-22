import { CustomerType } from "./customerType";
import { Product, TaxStatus } from "./product";
import {
  calculateSubTotal,
  calculateTax,
  calculateSavings,
  calculateChange,
} from "./purchase";

const products: Product[] = [
  {
    name: "a",
    amount: 2,
    regularPrice: 3.1,
    memberPrice: 2.1,
    taxStatus: TaxStatus.Taxable,
  },
  {
    name: "b",
    amount: 1,
    regularPrice: 4.22,
    memberPrice: 3.7,
    taxStatus: TaxStatus.Taxable,
  },
  {
    name: "c",
    amount: 5,
    regularPrice: 2,
    memberPrice: 1.34,
    taxStatus: TaxStatus.TaxExempt,
  },
];

describe("calculateSubTotal", () => {
  test("calculates correctly for regular customers", () => {
    const subtotal = calculateSubTotal(CustomerType.Regular, products);

    expect(subtotal).toEqual(20.42);
  });

  test("calculates correctly for member customers", () => {
    const subtotal = calculateSubTotal(CustomerType.Member, products);

    expect(subtotal).toEqual(14.6);
  });
});

describe("calculateTax", () => {
  test("calculates correctly for regular customers", () => {
    const tax = calculateTax(CustomerType.Regular, products);

    expect(tax).toEqual(0.68);
  });

  test("calculates correctly for member customers", () => {
    const tax = calculateTax(CustomerType.Member, products);

    expect(tax).toEqual(0.51);
  });
});

describe("calculateSavings", () => {
  test("calculates correctly for regular customers", () => {
    const savings = calculateSavings(CustomerType.Regular, products);

    expect(savings).toEqual(0);
  });

  test("calculates correctly for member customers", () => {
    const savings = calculateSavings(CustomerType.Member, products);

    expect(savings).toEqual(5.99);
  });
});

describe("calculateChange", () => {
  test("calculates correctly ", () => {
    const total = 17.56;
    const cashPayment = 20;
    const savings = calculateChange(total, cashPayment);

    expect(savings).toEqual(2.44);
  });
});

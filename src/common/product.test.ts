import { TaxStatus } from "./product";

describe("TaxStatus", () => {
  test("it serializes correclty", () => {
    expect(TaxStatus.TaxExempt.toString()).toBe("Tax-Exempt");
    expect(TaxStatus.Taxable.toString()).toBe("Taxable");
  });

  test("it deserializes correclty", () => {
    expect("Tax-Exempt" as TaxStatus).toBe(TaxStatus.TaxExempt);
    expect("Taxable" as TaxStatus).toBe(TaxStatus.Taxable);
  });
});

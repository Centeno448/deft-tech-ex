import path from "path";

import { getLastTransactionNumber } from "./receipt";

describe("getLastTransactionNumber", () => {
  test("returns the correct number", async () => {
    const transactionDirectory = path.join(
      __dirname,
      "../../tests/fixtures/transactions"
    );
    const num = await getLastTransactionNumber(transactionDirectory);

    expect(num).toBe(3);
  });
});

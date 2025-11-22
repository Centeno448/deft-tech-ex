import { getLastTransactionNumber } from "./receipt";
import path from "path";
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

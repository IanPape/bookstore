const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });

  // Test various numbers to ensure commas are correctly added
  test("adds commas to a four-digit number", () => {
    expect(addCommas(1234)).toBe("1,234");
  });

  test("adds commas to a seven-digit number", () => {
    expect(addCommas(1000000)).toBe("1,000,000");
  });

  test("adds commas to a large number", () => {
    expect(addCommas(9876543210)).toBe("9,876,543,210");
  });

  test("does not add commas to a single-digit number", () => {
    expect(addCommas(6)).toBe("6");
  });

  test("handles negative numbers correctly", () => {
    expect(addCommas(-10)).toBe("-10");
    expect(addCommas(-5678)).toBe("-5,678");
  });

  // Test edge cases like zero or very small numbers
  test("handles zero correctly", () => {
    expect(addCommas(0)).toBe("0");
  });

  test("handles small negative numbers correctly", () => {
    expect(addCommas(-2)).toBe("-2");
  });
});

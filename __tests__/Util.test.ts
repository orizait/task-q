import { sleep, getRandomInt, getRandomIntInRange, range } from "../Util"

describe("Util functions", () => {
  test("sleep should wait approximately correct time", async () => {
    const start = Date.now();
    await sleep(50);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(45);
  });

  test("getRandomInt returns number less than max", () => {
    const val = getRandomInt(10);
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(10);
  });

  test("getRandomIntInRange returns number in range", () => {
    const val = getRandomIntInRange(5, 10);
    expect(val).toBeGreaterThanOrEqual(5);
    expect(val).toBeLessThan(10);
  });

  test("range returns correct array", () => {
    expect(range(3)).toEqual([0, 1, 2]);
  });
});

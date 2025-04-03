import { Database, Message, Operations } from "../Database"

describe("Database", () => {
  let db: Database;

  beforeEach(() => {
    db = new Database();
  });

  test("should set value correctly", async () => {
    const msg = new Message("item1", Operations.SET, 42);
    await db.set(msg);
    expect(db.get("item1")).toBe(42);
  });

  test("should add value correctly", async () => {
    const setMsg = new Message("item1", Operations.SET, 50);
    const addMsg = new Message("item1", Operations.ADD, 10);
    await db.set(setMsg);
    await db.set(addMsg);
    expect(db.get("item1")).toBe(60);
  });

  test("should subtract value correctly", async () => {
    const setMsg = new Message("item1", Operations.SET, 100);
    const subMsg = new Message("item1", Operations.SUBTRACT, 30);
    await db.set(setMsg);
    await db.set(subMsg);
    expect(db.get("item1")).toBe(70);
  });
});

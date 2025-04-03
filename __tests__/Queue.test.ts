import { Queue } from "../Queue";
import { Message, Operations } from "../Database";

describe("Queue", () => {
  let queue: Queue;
  let message: Message;

  beforeEach(() => {
    queue = new Queue();
    message = new Message("item1", Operations.ADD, 5);
  });

  test("should enqueue and dequeue a message", () => {
    queue.Enqueue(message);
    const dequeued = queue.Dequeue();
    expect(dequeued).toEqual(message);
  });

  test("should not dequeue same message twice", () => {
    queue.Enqueue(message);
    const first = queue.Dequeue();
    const second = queue.Dequeue();
    expect(first).toBeDefined();
    expect(second).toBeUndefined();
  });

  test("should confirm a message and allow re-dequeue", () => {
    queue.Enqueue(message);
    const msg = queue.Dequeue();
    expect(msg).toBeDefined();
    queue.Confirm(msg!.id, msg!.key);
    queue.Enqueue(message);
    const retry = queue.Dequeue();
    expect(retry).toBeDefined();
  });

  test("should report queue size correctly", () => {
    expect(queue.Size()).toBe(0);
    queue.Enqueue(message);
    expect(queue.Size()).toBe(1);
  });
});

import { Worker } from "../Worker";
import { Queue } from "../Queue";
import { Message, Operations } from "../Database";

describe("Worker", () => {
  test("should process messages from the queue", async () => {
    const queue = new Queue();
    const log: string[] = [];

    const messages = [
      new Message("key1", Operations.SET, 1),
      new Message("key2", Operations.ADD, 2)
    ];
    messages.forEach(msg => queue.Enqueue(msg));

    const worker = new Worker(0, queue);

    await worker.Work(async (msg: Message) => {
      log.push(`${msg.key}:${msg.val}`);
    });

    expect(log).toEqual(["key1:1", "key2:2"]);
  });

  test("should exit if no messages", async () => {
    const queue = new Queue();
    const worker = new Worker(0, queue);
    const spy = jest.fn();

    await worker.Work(async (msg: Message) => {
      spy();
    });

    expect(spy).not.toHaveBeenCalled();
  });
});


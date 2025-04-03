import { Message } from "./Database";
import { Queue } from "./Queue";

export class Worker {
    private queue: Queue
    private workerId: number

    constructor(workerId: number, queue: Queue) {
        this.queue = queue
        this.workerId = workerId
    }

    Work = async (callback: (message: Message) => Promise<void>): Promise<void> => {
        while (true) {
            const message = this.queue.Dequeue()
            // TODO: did not end forever, because messages can still come later
            if (!message) {
                break
            }
            await callback(message)
            this.queue.Confirm(message.id, message.key)
        }
    }
}

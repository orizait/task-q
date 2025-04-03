import { Message } from "./Database";

export class Queue {
    private messages: Message[];
    private inProgress: Set<string>;

    constructor() {
        this.messages = [];
        this.inProgress = new Set();
    }

    Enqueue = (message: Message) => {
        this.messages.push(message);
    }

    Dequeue = (): Message | undefined => {
        if (!this.hasPendingMessages()) {
            return undefined;
        }

        for (let i = 0; i < this.messages.length; i++) {
            const message = this.messages[i];
            if (!this.inProgress.has(message.id)) {
                this.inProgress.add(message.id);
                return this.messages.splice(i, 1)[0];
            }
        }
        return undefined;
    }

    Confirm = (workerId: number, messageId: string) => {
        this.inProgress.delete(messageId);
    }

    Size = () => {
        return this.messages.length;
    }

    hasPendingMessages = (): boolean => {
        return this.messages.length > 0;
    }
}

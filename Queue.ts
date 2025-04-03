import { Message } from "./Database";

export class Queue {
    private messages: Message[];
    private inProgress: Set<string>;
    private lockedKeys: Set<string> = new Set();

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
            if (
              !this.inProgress.has(message.id) &&
              !this.lockedKeys.has(message.key)
            ) {
                this.inProgress.add(message.id);
                this.lockedKeys.add(message.key);
                return this.messages.splice(i, 1)[0];
            }
        }

        return undefined;
    }

    Confirm = (messageId: string, key?: string) => {
        this.inProgress.delete(messageId);
        if (key) {
            this.lockedKeys.delete(key);
        }
    }

    Size = () => {
        return this.messages.length;
    }

    hasPendingMessages = (): boolean => {
        return this.messages.length > 0;
    }
}

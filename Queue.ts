import { Message } from "./Database";

export class Queue {
    private messages: Message[];
    /**
     * Set of messages that are already being processed (by their unique ID).
     * Prevents the same message from being processed again.
     */
    private inProgress: Set<string>;
    /**
     * Set of keys (`key`) currently being processed.
     * Prevents multiple workers from working on the same key at the same time.
     */
    private lockedKeys: Set<string>;

    /** Simple initialization */
    constructor() {
        this.messages = [];
        this.inProgress = new Set();
        this.lockedKeys = new Set();
    }

    /**
     * Adds a new message to the queue
     */
    Enqueue = (message: Message) => {
        this.messages.push(message);
    }

    /**
     * Removes a message from the processing queue if:
     * - it is not yet being processed (ID is not in inProgress)
     * - its key is not yet locked (key is not in lockedKeys)
     *
     * After issuing a message:
     * - its ID is in inProgress
     * - its key is in lockedKeys
     */
    Dequeue = (): Message | undefined => {
        if (!this.hasPendingMessages()) {
            return undefined; // If the queue is empty, return undefined
        }

        // Looking for a message that is not yet in processing and has a unique key
        for (let i = 0; i < this.messages.length; i++) {
            const message = this.messages[i];
            if (
              !this.inProgress.has(message.id) && // not yet processed
              !this.lockedKeys.has(message.key) // and the key is not locked
            ) {
                this.inProgress.add(message.id); // mark as "in progress"
                this.lockedKeys.add(message.key); // lock the key
                return this.messages.splice(i, 1)[0];
            }
        }

        return undefined;
    }

    /**
     * After the message is processed:
     * - removes it from inProgress
     * - unlocks the key if it was transferred
     */
    Confirm = (messageId: string, key?: string) => {
        this.inProgress.delete(messageId); // Remove the ID from "in progress"
        if (key) {
            this.lockedKeys.delete(key); // Unlock the key so that other workers can process it
        }
    }

    Size = () => {
        return this.messages.length;
    }

    /** Checks if there is at least one message in the queue */
    hasPendingMessages = (): boolean => {
        return this.messages.length > 0; // Check if there is at least one message in the queue
    }
}

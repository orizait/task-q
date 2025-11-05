import {  Message } from "./Database";

export class Queue {
    private messages: Message[]
    private inFlight: Map<string, Set<string>>  // Tracks which keys are currently being processed

    constructor() {
        this.messages = []
        this.inFlight = new Map()
    }

    Enqueue = (message: Message) => {
        this.messages.push(message)
    }

    Dequeue = (workerId: number): Message | undefined => {
        // Find the first message whose key is not currently being processed
        // This ensures sequential processing per key while allowing parallel processing across different keys
        for (let i = 0; i < this.messages.length; i++) {
            const message = this.messages[i]
            const keyInFlight = this.inFlight.get(message.key)

            // Check if this key is currently being processed
            if (!keyInFlight || keyInFlight.size === 0) {
                // This key is available, remove message from queue
                this.messages.splice(i, 1)

                // Mark this message as in-flight for its key
                if (!this.inFlight.has(message.key)) {
                    this.inFlight.set(message.key, new Set())
                }
                this.inFlight.get(message.key)!.add(message.id)

                return message
            }
        }

        // No available messages (all remaining messages have keys that are being processed)
        return undefined
    }

    Confirm = (workerId: number, messageId: string) => {
        // Remove the message from in-flight tracking
        for (const [key, ids] of this.inFlight.entries()) {
            if (ids.has(messageId)) {
                ids.delete(messageId)
                // Clean up empty sets
                if (ids.size === 0) {
                    this.inFlight.delete(key)
                }
                return
            }
        }
    }

    Size = () => {
        return this.messages.length
    }
}


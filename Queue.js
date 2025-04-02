"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor() {
        this.Enqueue = (message) => {
            this.messages.push(message);
        };
        this.Dequeue = (workerId) => {
            if (!this.hasPendingMessages()) {
                return undefined; // Якщо немає повідомлень
            }
            for (let i = 0; i < this.messages.length; i++) {
                const message = this.messages[i];
                if (!this.inProgress.has(message.id)) {
                    // Відмічаємо повідомлення як в обробці
                    this.inProgress.add(message.id);
                    return this.messages.splice(i, 1)[0]; // Вилучаємо повідомлення з черги
                }
            }
            return undefined;
        };
        this.Confirm = (workerId, messageId) => {
            this.inProgress.delete(messageId); // Видаляємо з набору в обробці
        };
        // Повертаємо розмір черги (кількість повідомлень, що залишились)
        this.Size = () => {
            return this.messages.length;
        };
        // Перевірка, чи є ще не оброблені повідомлення в черзі
        this.hasPendingMessages = () => {
            return this.messages.length > 0;
        };
        this.messages = [];
        this.inProgress = new Set();
    }
}
exports.Queue = Queue;

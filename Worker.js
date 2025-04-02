"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
class Worker {
    constructor(workerId, queue) {
        this.Work = (callback) => __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const message = this.queue.Dequeue(this.workerId);
                if (!message) {
                    break;
                }
                yield callback(message);
                this.queue.Confirm(this.workerId, message.id);
            }
        });
        this.queue = queue;
        this.workerId = workerId;
    }
}
exports.Worker = Worker;

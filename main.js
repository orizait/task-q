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
const Database_1 = require("./Database");
const Queue_1 = require("./Queue");
const Util_1 = require("./Util");
const Worker_1 = require("./Worker");
const ITEMS_NUMBER = (0, Util_1.getRandomIntInRange)(3, 6);
const WORKERS_NUMBER = (0, Util_1.getRandomIntInRange)(3, 6);
const ITEMS = (0, Util_1.range)(ITEMS_NUMBER).map(item => `item${item}`);
const applyToAll = (queue, operation, val) => {
    for (const product of ITEMS) {
        queue.Enqueue(new Database_1.Message(product, operation, val));
    }
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Number of items:${ITEMS_NUMBER}`);
    console.log(`Number of workers:${WORKERS_NUMBER}`);
    const db = new Database_1.Database();
    const queue = new Queue_1.Queue();
    applyToAll(queue, Database_1.Operations.SET, 50);
    for (let i = 0; i < 10; i++) {
        applyToAll(queue, Database_1.Operations.ADD, i);
    }
    (0, Util_1.range)(WORKERS_NUMBER).forEach(i => {
        const worker = new Worker_1.Worker(i, queue);
        worker.Work(db.set);
    });
    yield (0, Util_1.sleep)(10000);
    console.log("Queue size: ", queue.Size());
    console.log("DB state:\n", JSON.stringify(db.state(), null, 4));
});
main();

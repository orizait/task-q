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
exports.Message = exports.Database = exports.Operations = void 0;
const Util_1 = require("./Util");
var Operations;
(function (Operations) {
    Operations[Operations["ADD"] = 0] = "ADD";
    Operations[Operations["SUBTRACT"] = 1] = "SUBTRACT";
    Operations[Operations["SET"] = 2] = "SET";
})(Operations || (exports.Operations = Operations = {}));
class Database {
    constructor() {
        this.set = (message) => __awaiter(this, void 0, void 0, function* () {
            const current = this.data[message.key] === undefined ? 50 : this.data[message.key];
            let result;
            switch (message.operation) {
                case Operations.ADD:
                    result = current + message.val;
                    break;
                case Operations.SUBTRACT:
                    result = current - message.val;
                    break;
                case Operations.SET:
                    result = message.val;
                    break;
                default:
                    throw Error(`Invalid operation ${message.operation}`);
            }
            const randomDelay = (0, Util_1.getRandomInt)(100);
            yield (0, Util_1.sleep)(randomDelay);
            console.log(`Set operation for ${message.key}: ${current} ${Operations[message.operation]} ${message.val} = ${result}`);
            this.data[message.key] = result;
        });
        this.get = (key) => {
            return this.data[key];
        };
        this.state = () => {
            return this.data;
        };
        this.data = {};
    }
}
exports.Database = Database;
class Message {
    constructor(key, operation, val) {
        this.key = key;
        this.operation = operation;
        this.val = val;
        this.id = `${key}:${val}:${operation}:${Date.now()}:${Math.random()}`;
    }
}
exports.Message = Message;

import { getRandomInt, sleep } from "./Util";

export enum Operations {
    ADD,
    SUBTRACT,
    SET
}

export class Database {

    private data: { [key: string]: number }
    private locks: Set<string> = new Set();

    constructor() {
        this.data = {};
    }

    set = async (message: Message): Promise<void> => {
        while (this.locks.has(message.key)) {
            await sleep(5);
        }
        this.locks.add(message.key);

        const current = this.data[message.key] === undefined ? 50 : this.data[message.key];
        let result: number
        switch (message.operation) {
            case Operations.ADD:
                result = current + message.val
                break;
            case Operations.SUBTRACT:
                result = current - message.val
                break;
            case Operations.SET:
                result = message.val
                break;
            default:
                throw Error(`Invalid operation ${message.operation}`)
        }

        const randomDelay = getRandomInt(100)
        await sleep(randomDelay)

        console.log(`Set operation for ${message.key}: ${current} ${Operations[message.operation]} ${message.val} = ${result}`);

        this.data[message.key] = result

        this.locks.delete(message.key);
    }

    get = (key: string): number => {
        return this.data[key]
    }

    state = () => {
        return this.data
    }
}

export class Message {
    public key: string
    public operation: Operations
    public val: number
    public id: string

    constructor(key: string, operation: Operations, val: number) {
        this.key = key
        this.operation = operation
        this.val = val
        this.id = `${key}:${val}:${operation}:${Date.now()}:${Math.random()}`
    }
}

import {  Message } from "./Database";

export class Queue {
    private pending: Message[]
    private inWork = {}

    constructor() {
        this.pending = []
    }

    Enqueue = (message: Message) => {
        this.pending.push(message)
    }

    Dequeue = (workerId: number): Message | undefined => {
        const mes = this.pending.find(m => !this.inWork[m.key])
        if(mes) {
            this.inWork[mes.key] = mes.id
            this.pending = this.pending.filter(m => m.id !== mes.id)
        }
        return mes
    }

    Confirm = (workerId: number, messageId: string) => {
        for(const k of Object.keys(this.inWork)){
            if(this.inWork[k] === messageId){
                delete this.inWork[k]
                break;
            }
        }
    }

    Size = () => {
        return this.pending.length
    }
}


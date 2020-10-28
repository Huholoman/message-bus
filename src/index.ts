
export class Bus {
    subscriptions: Map<string, Map<symbol, (message: object) => void>>

    constructor() {
        this.subscriptions = new Map<string, Map<any, () => void>>()
    }

    public subscribe(channel: string, callback: (message: object) => void): () => void {
        if (!this.subscriptions.has(channel)) {
            this.subscriptions.set(channel, new Map<symbol, (message: object) => void>())
        }

        const id = Symbol();
        // @ts-ignore
        this.subscriptions.get(channel).set(id, callback)

        return () => this.unsubscribe(channel, id)
    }

    private unsubscribe(channel: string, id: symbol) {
        this.subscriptions.get(channel)?.delete(id)

        // @ts-ignore
        if (this.subscriptions.get(channel).size === 0) {
            this.subscriptions.delete(channel)
        }
    }

    public publish(channel: string, message: {some: string}) {
        this.subscriptions.get(channel)?.forEach((subscription: (message: object) => void) => {
            subscription(message)
        })
    }
}


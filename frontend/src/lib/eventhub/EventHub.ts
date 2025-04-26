export class EventHub {
    events: Record<string, Function[]>;
    static instance: EventHub | null = null;

    constructor() {
        this.events = {};
    }

    // Subscribe to an event
    subscribe(event: string, listener: Function): Function {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);

        //return a function to unsubscribe for convenience
        return () => this.unsubscribe(event, listener);
    }

    // Publish an event
    publish(event: string, data: any): void {
        if (!this.events[event]) return;
        this.events[event].forEach((listener) => listener(data));
    }

    // Unsubscribe from an event
    unsubscribe(event: string, listenerToRemove: Function): void {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter((listener) => listener !== listenerToRemove);
    }

    // Get the singleton instance of EventHub
    static getInstance(): EventHub {
        if (!EventHub.instance) {
            EventHub.instance = new EventHub();
        }
        return EventHub.instance;
    }
}
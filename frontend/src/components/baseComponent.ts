export abstract class BaseComponent {
    parent: HTMLElement;

    constructor() {
        this.parent = document.createElement("div");
    }

    /**
     * This is as abstract method that should be implemented by the child class.
     * It should return the HTML element that will be used to render the component.
     * @abstract 
     */
    render(): HTMLElement {
        throw new Error("Method 'render()' must be implemented.");
    }

    dispacthCustomEvent(eventName: string, detail = {}): void {
        const event = new CustomEvent(eventName, { detail });
        this.parent.dispatchEvent(event);
    }

    listenToEvent(eventName: string, callback: EventListenerOrEventListenerObject): void {
        this.parent.addEventListener(eventName, callback);
    }
}
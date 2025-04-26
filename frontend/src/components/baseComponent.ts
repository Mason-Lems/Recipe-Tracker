export abstract class BaseComponent {
    cssLoaded: boolean;
    parent: HTMLElement;

    constructor() {
        this.cssLoaded = false;
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

    loadCSS(path: string, fileName: string): void {
        if (this.cssLoaded) return;

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = `${path}/${fileName}`;
        this.cssLoaded = true;
    }

    dispacthCustomEvent(eventName: string, detail = {}): void {
        const event = new CustomEvent(eventName, { detail });
        this.parent.dispatchEvent(event);
    }

    listenToEvent(eventName: string, callback: EventListenerOrEventListenerObject): void {
        this.parent.addEventListener(eventName, callback);
    }
}
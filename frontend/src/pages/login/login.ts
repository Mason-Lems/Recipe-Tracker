import { BaseComponent } from '@/components/baseComponent';
//import { Events, EventHub} from "@/lib/eventhub/index";

export class LoginPage extends BaseComponent {
    #container: HTMLElement | null = null;

    constructor() {
        super();
        this.loadCSS("login", "login.css");
    }

    render(): HTMLElement { 
        if (this.#container) return this.#container;

        this.#container = document.createElement("div");
        this.#container.classList.add("login-page");
        this.#setupContainerContent();
        this.#attachEventListeners();

        return this.#container;
    }

    #setupContainerContent(): void {
        if (!this.#container) return;
        this.#container.innerHTML = `
            <div>
                <h1>Login</h1>
                <div> Implement login page here</div>
            </div>
        `;
    }

    #attachEventListeners(): void {
        if (!this.#container) return;
    }

}
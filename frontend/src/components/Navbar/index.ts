import { Events, EventHub } from "@/lib/eventhub/index";
import { BaseComponent } from "@/components/baseComponent";

export class NavBar extends BaseComponent {
    #hub: EventHub | null = null;

    constructor() {
        super();
        this.#hub = EventHub.getInstance();
    }

    render(): HTMLElement { 

        // Create the navbar container
        const container = document.createElement("nav");
        container.id = "navbar";
        container.classList.add("navbar");

        // Populate the navbar with links
        container.innerHTML = `
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/recipes">Recipes</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        `;

        // Get all anchor tags in the element
        const links = container.querySelectorAll("a");

        // Add event listeners to each link
        links.forEach((link) => {
            link.addEventListener("click", async (e) => {
                // Prevent default link behavior
                e.preventDefault();
                if (!this.#hub) return;

                //Get the page name from the href attribute
                const page = link.getAttribute("href");

                this.#hub.publish(Events.NavigateTo, page);
            });
        });

        return container;
    }
}
import { RecipeListPage } from "@/pages/recipeList";
import { LoginPage } from "@/pages/login";
import { BaseComponent } from "@/components/baseComponent";
import { NavBar } from "@/components/Navbar";
import { Events, EventHub } from "@/lib/eventhub/index";

export default class App {
    #container: HTMLElement | null = null; //Private container for the component
    #pageContainer: HTMLElement | null = null; //Private page container for the page contenet
    #pageComponets: Record<string, BaseComponent> = {}; 
    #currentPage: string = "home"; //Private current page
    #hub: EventHub | null = null; //Private event hub

    constructor() {
        this.#hub = EventHub.getInstance(); //Get the event hub instance
        this.#hub.subscribe(Events.NavigateTo, (page: string) => this.#navigateTo(page)); //Subscribe to the navigate event
        this.#pageComponets = {
            home: new RecipeListPage(), //Add the recipe list page to the page components
            login: new LoginPage() //Add the login page to the page components
        };
    }

    //Render the AppController and return the container
    render(): HTMLElement {
        this.#createContainer(); //Create the container
        this.#setupContainerContent(); //Setup the container content

        // Initially render the main view
        this.#renderCurrentPage();
        if (!this.#container) throw new Error("Container is not defined"); //Throw an error if the container is not defined
        return this.#container; //Return the container
    }

    //Creates the main container
    #createContainer(): void {
        this.#container = document.createElement("div"); //Create the container
        this.#container.id = "app";
        this.#container.classList.add("app"); //Add the app class to the container
    }

    // Sets up the HTML structure of the container
    #setupContainerContent(): void {
        if (!this.#container) throw new Error("Container is not defined"); //Throw an error if the container is not defined

        const navbar = new NavBar(); //Create the navbar
        this.#container.appendChild(navbar.render()); //Append the navbar to the container

        this.#pageContainer = document.createElement("main"); //Create the page container
        this.#pageContainer.id = "page-container"; //Set the id of the page container
        this.#container.appendChild(this.#pageContainer); //Append the page container to the container
    }

    #navigateTo(page: string): void {
        switch (page) {
            case "":
            case "/":
            case "/home":
                this.#currentPage = "home";
                break;
            case "/login":
                this.#currentPage = "login";
                break;
            default:
                this.#currentPage = "404";
        }
        this.#renderCurrentPage(); //Render the current page

        //Update the URL without reloading the page
        window.history.pushState({ page }, page,  window.location.origin + page); //Push the new state to the history
    }

    #renderCurrentPage(): void {
        if (!this.#pageContainer) throw new Error("Page container is not defined"); //Throw an error if the page container is not defined
        
        this.#pageContainer.innerHTML = ""; //Clear the page container
        const pageComponent = this.#pageComponets[this.#currentPage]; //Get the current page component
        
        if (!pageComponent) throw new Error(`Page component not found for view: ${this.#currentPage}`); //Throw an error if the page component is not defined
        this.#pageContainer.appendChild(pageComponent.render()); //Append the page component to the page container
    }
}
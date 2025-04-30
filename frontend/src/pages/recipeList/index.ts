import { BaseComponent } from "@/components/baseComponent";
import { Events, EventHub } from "@/lib/eventhub/index";
import { RecipeData } from "@/lib/models/recipe";
import { RecipeInputComponent } from "@/components/recipeInputComponent";
import { RecipeListComponent } from "@/components/recipeListComponent";
import "./styles.css";

export class RecipeListPage extends BaseComponent {
    #container: HTMLElement | null = null;
    #recipeInput: RecipeInputComponent;
    #recipeList: RecipeListComponent;

    constructor() {
        super();
        this.#recipeInput = new RecipeInputComponent();
        this.#recipeList = new RecipeListComponent();
    }

    render(): HTMLElement {
        if (this.#container) return this.#container;

        this.#container = document.createElement("div");
        this.#container.classList.add("recipe-list-page");
        this.#setupContainerContent();
        this.#attachEventListeners();
        
        return this.#container;
    }

    #setupContainerContent(): void {
        if (!this.#container) return;

        //Create header section
        const header = document.createElement("header");
        header.innerHTML = '<h1>Recipe List</h1>';

        //Create mainContent section
        const mainContent = document.createElement("mainContent");

        //add componenents to mainContent
        mainContent.appendChild(this.#recipeInput.render());
        mainContent.appendChild(this.#recipeList.render());

        //Add sections to container
        this.#container.appendChild(header);
        this.#container.appendChild(mainContent);
    }

    #attachEventListeners(): void {
        const hub = EventHub.getInstance();

        //subscribe to relevant events
        hub.subscribe(Events.RecipesLoaded, (recipes: RecipeData[]) => this.setRecipes(recipes));
    }

    // method to set recipes in the recipe list component
    setRecipes(recipes: RecipeData[]): void {
        recipes.forEach(recipe => {
            const hub = EventHub.getInstance();
            hub.publish(Events.NewRecipe, recipe);
        });
    }
}
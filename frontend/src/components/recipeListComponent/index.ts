import { BaseComponent } from "@/components/baseComponent";
import { RecipeComponent } from "@/components/recipeComponent";
import { Events, EventHub } from "@/lib/eventhub/index";
import { RecipeData } from "@/lib/models/recipe";
import "./styles.css";
export class RecipeListComponent extends BaseComponent {
    #container: HTMLElement | null = null;

    constructor() {
        super();
    }

    // Renders the component and returns the container element
    render(): HTMLElement {
        if (this.#container) {
            return this.#container;
        }

        this.#container = document.createElement("div");
        this.#container.classList.add("recipe-list");
        this.#setupContainerContent();
        this.#attachEventListeners();

        return this.#container;
    }

    #setupContainerContent(): void {
        if (!this.#container) return;
        this.#container.innerHTML = `
            <h2>Recipe List</h2>
            <ul id="recipeListWrapper></ul>
            <button id="deleteRecipe">Delete Selected Recipes</button>
        `;
    }

    #attachEventListeners(): void {
        if (!this.#container) return;
        const hub = EventHub.getInstance();

        // Subscribe to the 'NewRecipe' event
        hub.subscribe(Events.NewRecipe, (recipe: RecipeData) => this.#addRecipeToList(recipe));

        // Attach event listener for the delete selected recipes button
        const deleteButton = this.#container.querySelector("#deleteRecipe");
        deleteButton?.addEventListener("click", () => {
            this.#deleteRecipeFromFocused();
        });
        hub.subscribe(Events.RecipeDeleted, () => {
            // Normally it would be some function dealing with the backend or the database, but for now. . .
            hub.publish(Events.RecipeDeleted, null);
        });

        hub.subscribe(Events.RecipeDeleted, () => this.#deleteRecipeFromFocused());
    }

    #addRecipeToList(recipeData: RecipeData): void {
        const recipeList = this.#getRecipeListElement();

        // Create a new instance of RecipeComponent for each recipe
        const recipe: RecipeComponent = new RecipeComponent(recipeData);
        recipeList?.appendChild(recipe.render());
    }

    #getRecipeListElement(): HTMLElement | null{
        if (!this.#container) return null;
        return this.#container.querySelector("#recipeListWrapper");
    }

    #deleteRecipeFromFocused(): void {
        const focused = document.activeElement;
        
        if (focused instanceof HTMLElement && focused.dataset.id) {
            const recipeId = focused.dataset.id;

            const hub = EventHub.getInstance();
            hub.publish(Events.RecipeDeleted, { id: recipeId });

        }
    }

    getContainer(): HTMLElement | null {
        return this.#container;
    }
}
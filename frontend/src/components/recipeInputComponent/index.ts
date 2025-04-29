import { EventHub, Events } from "@/lib/eventhub";
import { BaseComponent } from "@/components/baseComponent";

export class RecipeInputComponent extends BaseComponent {
    #container: HTMLElement | null = null;

    constructor() {
        super();
        this.loadCSS("src/components/recipeInputComponent", "styles");
    }

    render() {
        if (this.#container) {
            return this.#container;
        }

        this.#container = document.createElement("div");
        this.#container.classList.add("recipe-input");
        this.#container.innerHTML = this.#getTemplate();

        this.#attachEventListeners();
        return this.#container;
    }

    #getTemplate() {
        // returns the HTML template for the recipe input component
        return `
            <div class="recipe-input-header">
                <h2>Recipe Input</h2>
            </div>
            <div class="recipe-input-body">
                <input type="text" id="recipe-name" placeholder="Recipe Name" />
                <textarea id="recipe-description" placeholder="Recipe Description"></textarea>
                <button id="submit-recipe">Submit Recipe</button>
            </div>
        `;
    }

    #attachEventListeners() {
        if (!this.#container) return;

        //get the elements from the container
        const submitButton = this.#container.querySelector("#submit-recipe") as HTMLButtonElement;
        const recipeNameInput = this.#container.querySelector("#recipe-name") as HTMLInputElement;
        const recipeDescriptionInput = this.#container.querySelector("#recipe-description") as HTMLTextAreaElement;

        //attach event listeners to the submit button
        submitButton?.addEventListener("click", () => {
            this.#handleSubmitRecipe(recipeNameInput, recipeDescriptionInput);
        });

        //attach event listeners to the input fields
        recipeNameInput?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.#handleSubmitRecipe(recipeNameInput, recipeDescriptionInput);
            }
        });

        recipeDescriptionInput?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.#handleSubmitRecipe(recipeNameInput, recipeDescriptionInput);
            }
        });
    }

    #handleSubmitRecipe(
        recipeNameInput: HTMLInputElement | null,
        recipeDescriptionInput: HTMLTextAreaElement | null,
    ) {
        const recipeName = recipeNameInput?.value.trim();
        const recipeDescription = recipeDescriptionInput?.value.trim();

        if(!recipeName || !recipeDescription) {
            alert("Please fill in all fields.");
            return;
        }

        //publish a NewRecipe event with the recipe data
        this.#publishNewRecipeEvent(recipeName, recipeDescription);

        //clear the input fields
        this.#clearInputs(recipeNameInput, recipeDescriptionInput);
    }

    #publishNewRecipeEvent(recipeName: string, recipeDescription: string) {
        const hub = EventHub.getInstance();
        hub.publish(Events.NewRecipe, { recipeName, recipeDescription });
        hub.publish(Events.StoreRecipe, { recipeName, recipeDescription });
    }

    #clearInputs(
        recipeNameInput: HTMLInputElement | null,
        recipeDescriptionInput: HTMLTextAreaElement | null,
    ) {
        if (recipeNameInput) recipeNameInput.value = "";
        if (recipeDescriptionInput) recipeDescriptionInput.value = "";
    }
    
}
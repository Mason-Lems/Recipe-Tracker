import { BaseComponent } from "@/components/baseComponent";
import { RecipeData } from "@/lib/models/recipe";

export class RecipeComponent extends BaseComponent {
    recipeData: RecipeData;
    #container: HTMLElement | null = null;

    constructor(recipeData: RecipeData) {
        super();
        this.recipeData = recipeData;
        this.loadCSS("src/components/recipeListComponent", "styles");
    }

    render(): HTMLElement { 
        // Create the main container
        this.#container = document.createElement("div");
        this.#container.classList.add("recipe-list-item");

        // Render the recipe text
        const recipeText = this.#createRecipeText();
        this.#container.appendChild(recipeText);

        // Render the view button
        const viewButton = this.#createViewButton();
        this.#container.appendChild(viewButton);

        return this.#container;
    }

    #createRecipeText(): HTMLElement {
        const recipeText = document.createElement("div");
        recipeText.classList.add("recipe-text");
        recipeText.innerHTML = `
            <h3>${this.recipeData.name}</h3>
            <p>${this.recipeData.description}</p>
        `;
        return recipeText;
    }

    #createViewButton(): HTMLElement {
        const viewButton = document.createElement("button");
        viewButton.classList.add("view-button");
        viewButton.innerText = "View Recipe";
        //viewButton.addEventListener("click", () => {
            //this.#dispatchViewRecipeEvent();
        //});
        return viewButton;
    }

}

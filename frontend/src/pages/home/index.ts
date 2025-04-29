import { BaseComponent } from "@/components/baseComponent";
import { Events, EventHub } from "@/lib/eventhub/index";
import { RecipeData } from "@/lib/models/recipe";
import { RecipeListComponent } from "@/components/recipeListComponent";

export class HomePage extends BaseComponent {
    #container: HTMLElement | null = null;
    #RecipeList: RecipeListComponent;

    constructor() {
        super();
        this.loadCSS("src/pages/home", "styles");
        this.#RecipeList = new RecipeListComponent();
    }
}
import { BaseComponent } from "@/components/baseComponent";
import { Events, EventHub } from "@/lib/eventhub/index";
import { Recipe } from "@/lib/models/recipe";
import { RecipeListComponent } from "@/components/recipeComponent";

export class HomePage extends BaseComponent {
    #container: HTMLElement | null = null;
    #RecipeList: RecipeListComponent;

    constructor() {
        super();
        this.loadCSS("src/pages/home", "styles");
        this.#RecipeList = new RecipeListComponent();
    }
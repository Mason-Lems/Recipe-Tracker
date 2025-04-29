/**
 * An object containing all the events that can be emitted by the event hub.
 * * @typedef {Object} Events
 */

export const Events = {
    NewRecipe: "NewRecipe",

    LoadRecipe: "LoadRecipe",
    LoadRecipeSuccess: "LoadRecipeSuccess",
    LoadRecipeFailure: "LoadRecipeFailure",


    StoreRecipe: "StoreRecipe",
    StoreRecipeSuccess: "StoreRecipeSuccess",
    StoreRecipeFailure: "StoreRecipeFailure",

    RecipeUpdated: "RecipeUpdated",
    RecipeUpdatedSuccess: "RecipeUpdatedSuccess",
    RecipeUpdatedFailure: "RecipeUpdatedFailure",

    RecipeDeleted: "RecipeDeleted",
    RecipeDeletedSuccess: "RecipeDeletedSuccess",
    RecipeDeletedFailure: "RecipeDeletedFailure",

    RecipesLoaded: "RecipesLoaded",
    RecipeError: "RecipeError",

    NavigateTo: "NavigateTo",
}
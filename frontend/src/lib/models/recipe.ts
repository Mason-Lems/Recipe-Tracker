export interface RecipeData {
    id: Int16Array;
    name: string;
    description: string;
    ingredients: object;
    instructions: Array<string>;
}
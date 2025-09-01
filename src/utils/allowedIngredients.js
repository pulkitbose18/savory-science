import recipes from "../data/recipes";
import ingredientMap from "./ingredientMap";

// 1. Get unique ingredients from recipes
const recipeIngredients = new Set(
  recipes.flatMap((r) =>
    r.ingredients.map((i) => i.toLowerCase().trim())
  )
);

// 2. Add mapped values also
Object.values(ingredientMap).forEach((mapped) =>
  recipeIngredients.add(mapped.toLowerCase())
);

// 3. Export final allowed ingredients list
const allowedIngredients = Array.from(recipeIngredients);

export default allowedIngredients;

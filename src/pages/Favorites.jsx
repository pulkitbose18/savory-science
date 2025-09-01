// src/pages/Favorites.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import recipes from "../data/recipes";
import SimilarRecipesModal from "../components/SimilarRecipesModal";

export default function Favorites({ favorites, removeFromFavorites }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const findSimilarRecipes = (recipeId) => {
    const targetRecipe = recipes.find((r) => r.id === recipeId);
    if (!targetRecipe) return;

    const targetIngredients = targetRecipe.ingredients.map((i) =>
      i.toLowerCase()
    );

    const similar = recipes
      .filter((r) => r.id !== recipeId) // Exclude the target recipe itself
      .map((r) => {
        const commonIngredients = r.ingredients.filter((ing) =>
          targetIngredients.includes(ing.toLowerCase())
        );
        const score = commonIngredients.length;
        return { ...r, score };
      })
      .sort((a, b) => b.score - a.score) // Sort by most common ingredients
      .slice(0, 5); // Get top 5

    setSimilarRecipes(similar);
    setIsModalOpen(true);
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No favorite recipes yet!</p>
        <Link to="/" className="text-blue-600 underline block mt-2">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Favorite Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((r) => (
          <div
            key={r.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-start"
          >
            <img src={r.imageUrl} alt={r.name} className="w-full h-32 object-cover rounded-md mb-4" />
            <Link to={`/recipe/${r.id}`} className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{r.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {r.time} mins | {r.difficulty} | {r.dietType}
              </p>
            </Link>

            <div className="flex mt-4">
              <button
                onClick={() => removeFromFavorites(r.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Remove
              </button>
              <button
                onClick={() => findSimilarRecipes(r.id)}
                className="ml-2 px-3 py-1 text-sm bg-blue-500 text-white rounded"
              >
                Find Similar
              </button>
            </div>
          </div>
        ))}
      </div>
      <SimilarRecipesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipes={similarRecipes}
      />
    </div>
  );
}

// src/pages/RecipeDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import recipes from "../data/recipes";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// substitution map
const SUBS = {
  butter: ["olive oil", "ghee"],
  milk: ["almond milk", "oat milk"],
  egg: ["flax egg", "chia egg"],
  "soy sauce": ["tamari", "coconut aminos"],
  cream: ["yogurt", "coconut cream"],
};

function getSubs(ingredient) {
  const key = ingredient.toLowerCase();
  return SUBS[key] || [];
}

export default function RecipeDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id, 10);
  const recipe = recipes.find((r) => r.id === recipeId);

  const [rating, setRating] = useState(0);
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [openSection, setOpenSection] = useState(null);

  if (!recipe) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Recipe not found.</p>
        <button onClick={() => navigate(-1)} className="mt-3 text-blue-600">
          Go Back
        </button>
      </div>
    );
  }

  function saveRating(star) {
    setRating(star);
    const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
    ratings[recipeId] = star;
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }

  const isFav = favorites.some((r) => r.id === recipe.id);

  const nutritionData = [
    { name: "Calories", value: recipe.nutrition?.calories ?? 0 },
    { name: "Protein (g)", value: recipe.nutrition?.protein ?? 0 },
  ];
  const COLORS = ["#82ca9d", "#8884d8"];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-64 object-cover rounded-xl shadow-md" />
      {/* Title & Favorite */}
      <div className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{recipe.name}</h1>
          <p className="text-gray-500">
            {recipe.dietType} • {recipe.time} mins • {recipe.difficulty}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => toggleFavorite(recipe)}
            className={`px-5 py-2 rounded-full shadow-md transition ${
              isFav ? "bg-yellow-400 text-black" : "bg-pink-500 text-white"
            }`}
          >
            {isFav ? "Remove Favorite" : "Add to Favorites"}
          </button>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Back
          </Link>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => saveRating(s)}
              className={`text-3xl ${
                s <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              {s <= rating ? '★' : '☆'}
            </button>
          ))}
        </div>
        <span className="text-gray-500">
          {rating ? `${rating}/5` : "Rate this recipe"}
        </span>
      </div>

      {/* Servings */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
        <span className="text-sm text-gray-600">Servings:</span>
        <button
          onClick={() => setServings((s) => Math.max(1, s - 1))}
          className="px-3 py-1 border rounded"
        >
          -
        </button>
        <div className="px-4">{servings}</div>
        <button
          onClick={() => setServings((s) => s + 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {/* Ingredients */}
        <div className="bg-white p-5 rounded-xl shadow">
          <button
            className="w-full flex justify-between items-center font-semibold text-lg"
            onClick={() =>
              setOpenSection(openSection === "ingredients" ? null : "ingredients")
            }
          >
            Ingredients
            <span>{openSection === "ingredients" ? "up" : "down"}</span>
          </button>
          {openSection === "ingredients" && (
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>
                  {ing}
                  {getSubs(ing).length > 0 && (
                    <span className="text-xs text-gray-500">
                      {" "}
                      — substitute: {getSubs(ing).join(", ")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Steps */}
        <div className="bg-white p-5 rounded-xl shadow">
          <button
            className="w-full flex justify-between items-center font-semibold text-lg"
            onClick={() =>
              setOpenSection(openSection === "steps" ? null : "steps")
            }
          >
            Steps
            <span>{openSection === "steps" ? "up" : "down"}</span>
          </button>
          {openSection === "steps" && (
            <ol className="list-decimal ml-6 mt-3 space-y-2 text-gray-700">
              {recipe.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          )}
        </div>

        {/* Nutrition */}
        <div className="bg-white p-5 rounded-xl shadow">
          <button
            className="w-full flex justify-between items-center font-semibold text-lg"
            onClick={() =>
              setOpenSection(openSection === "nutrition" ? null : "nutrition")
            }
          >
            Nutrition
            <span>{openSection === "nutrition" ? "up" : "down"}</span>
          </button>
          {openSection === "nutrition" && (
            <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
              <div>
                <p>Calories: {recipe.nutrition?.calories ?? "N/A"}</p>
                <p>Protein: {recipe.nutrition?.protein ?? "N/A"} g</p>
              </div>
              <PieChart width={250} height={250}>
                <Pie
                  data={nutritionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nutritionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

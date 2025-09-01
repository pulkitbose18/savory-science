// src/pages/Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import recipes from "../data/recipes";

export default function Home({ favorites, addToFavorites, removeFromFavorites }) {
  const [search, setSearch] = useState("");
  const [diet, setDiet] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [time, setTime] = useState("");

  const filtered = recipes.filter((r) => {
    return (
      (search === "" || r.name.toLowerCase().includes(search.toLowerCase())) &&
      (diet === "" || r.dietType === diet) &&
      (difficulty === "" || r.difficulty === difficulty) &&
      (!isGlutenFree || r.isGlutenFree) &&
      (time === "" ||
        (time === "<30" && r.time < 30) ||
        (time === "30-60" && r.time >= 30 && r.time <= 60) ||
        (time === ">60" && r.time > 60))
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="flex-1 p-2 border rounded"
        />

        {/* Diet Filter */}
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Filter by Diet</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian (Egg)">Vegetarian (Egg)</option>
        </select>

        {/* Difficulty Filter */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Filter by Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Time Filter */}
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Filter by Time</option>
          <option value="<30">Under 30 mins</option>
          <option value="30-60">30-60 mins</option>
          <option value=">60">Over 60 mins</option>
        </select>

        {/* Gluten-Free Filter */}
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={isGlutenFree}
            onChange={(e) => setIsGlutenFree(e.target.checked)}
          />
          <span>Gluten-Free</span>
        </label>
      </div>

      {/* Recipes */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No recipes found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((r) => {
            const isFav = favorites.some((f) => f.id === r.id);
            return (
              <div
                key={r.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <Link to={`/recipe/${r.id}`}>
                  <img src={r.imageUrl} alt={r.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-bold">{r.name}</h3>
                  <p className="text-sm text-gray-600">
                    {r.time} mins | {r.difficulty} | {r.dietType}
                  </p>
                </Link>

                {/* Add / Remove button */}
                {isFav ? (
                  <button
                    onClick={() => removeFromFavorites(r.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => addToFavorites(r)}
                    className="mt-2 px-3 py-1 bg-pink-500 text-white rounded"
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

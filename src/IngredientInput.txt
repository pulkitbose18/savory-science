import { useState } from "react";
import recipes from "../data/recipes";
import { Link } from "react-router-dom";
import allowedIngredients from "../utils/allowedIngredients";

// Dietary restriction maps
const NON_VEG_ING = ["chicken", "fish", "meat", "mutton", "prawn", "egg"];
const VEGAN_BLOCK = [
  "milk",
  "butter",
  "ghee",
  "yogurt",
  "paneer",
  "cheese",
  "cream",
  "egg",
  "honey",
];

export default function IngredientInput() {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);
  const [dietFilters, setDietFilters] = useState({
    vegetarianOnly: false,
    veganOnly: false,
    eggFree: false,
    glutenFree: false,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // Add comma separated ingredients to chips
  function addFromInput() {
    const arr = input
      .toLowerCase()
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .filter((s) => {
        if (allowedIngredients.includes(s)) {
          return true;
        } else {
          setError(`'${s}' is not a valid ingredient.`);
          return false;
        }
      });

    const unique = Array.from(new Set([...chips, ...arr]));
    setChips(unique);
    setInput("");
  }

  function removeChip(c) {
    setChips(chips.filter((x) => x !== c));
  }

  function clearAll() {
    setChips([]);
    setResults([]);
    setError("");
    setInput("");
  }

  // Dietary restrictions filter
  function respectsDiet(recipe) {
    const ings = recipe.ingredients.map((i) => i.toLowerCase());

    if (dietFilters.veganOnly) {
      if (ings.some((ing) => VEGAN_BLOCK.some((v) => ing.includes(v))))
        return false;
    } else if (dietFilters.vegetarianOnly) {
      if (
        ings.some((ing) =>
          NON_VEG_ING.some((nv) => ing.includes(nv) && nv !== "egg")
        )
      )
        return false;
    }

    if (dietFilters.eggFree) {
      if (ings.some((ing) => ing.includes("egg"))) return false;
    }

    if (dietFilters.glutenFree) {
      if (!recipe.isGlutenFree) return false;
    }

    return true;
  }

  // Matching logic
  function handleSearch() {
    setError("");

    if (chips.length === 0) {
      setResults([]);
      setError("Add ingredients first.");
      return;
    }

    setIsSearching(true);
    const matched = recipes
      .filter(respectsDiet)
      .map((r) => {
        const RINGS = r.ingredients.map((i) => i.toLowerCase());
        const hits = chips.filter((c) =>
          RINGS.includes(c)
        );
        const score = hits.length / RINGS.length;
        return { ...r, _score: score, _hits: hits };
      })
      .filter((x) => x._score > 0)
      .sort((a, b) => b._score - a._score || a.time - b.time);

    setResults(matched);
    setIsSearching(false);
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Find Recipes by Ingredients</h1>
        <button
          onClick={clearAll}
          className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          Clear
        </button>
      </div>

      {/* Input + Buttons */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addFromInput}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Chips */}
      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full text-sm"
            >
              {c}
              <button
                onClick={() => removeChip(c)}
                className="text-blue-500 hover:text-blue-700"
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="mt-4 flex gap-4 flex-wrap">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={dietFilters.vegetarianOnly}
            onChange={(e) =>
              setDietFilters((d) => ({
                ...d,
                vegetarianOnly: e.target.checked,
                veganOnly: e.target.checked ? false : d.veganOnly,
              }))
            }
          />
          <span>Vegetarian only</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={dietFilters.veganOnly}
            onChange={(e) =>
              setDietFilters((d) => ({
                ...d,
                veganOnly: e.target.checked,
                vegetarianOnly: e.target.checked ? true : d.vegetarianOnly,
              }))
            }
          />
          <span>Vegan only</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={dietFilters.eggFree}
            onChange={(e) =>
              setDietFilters((d) => ({ ...d, eggFree: e.target.checked }))
            }
          />
          <span>Egg-free</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={dietFilters.glutenFree}
            onChange={(e) =>
              setDietFilters((d) => ({ ...d, glutenFree: e.target.checked }))
            }
          />
          <span>Gluten-Free</span>
        </label>

        <button
          onClick={handleSearch}
          className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {isSearching ? "Searching..." : "Find Recipes"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
          {error}
        </div>
      )}

      {/* Results */}
      <div className="mt-6">
        {results.length === 0 ? (
          <p className="text-gray-500">
            {chips.length === 0
              ? "Add ingredients to get recipe suggestions."
              : "No recipes matched. Try removing some ingredients or relaxing diet filters."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((r) => (
              <Link
                key={r.id}
                to={`/recipe/${r.id}`}
                className="block bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{r.name}</h3>
                  <span className="ml-3 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                    Match: {(r._score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {r.time} mins · {r.difficulty} · {r.dietType}
                </p>
                {r._hits?.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    Matched: {r._hits.join(", ")}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import IngredientInput from "./pages/IngredientInput";

function App() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add to favorites
  const addToFavorites = (recipe) => {
    if (!favorites.find((r) => r.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((r) => r.id !== id));
  };

  // Toggle Favorite (for detail page)
  const toggleFavorite = (recipe) => {
    if (favorites.find((r) => r.id === recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Smart Recipe Generator
          </Link>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/ingredients" className="hover:underline">Ingredients</Link>
            <Link to="/favorites" className="hover:underline">
              Favorites ({favorites.length})
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <main className="p-6 max-w-6xl mx-auto flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetail
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
          <Route path="/ingredients" element={<IngredientInput />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

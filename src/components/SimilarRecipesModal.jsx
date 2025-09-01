import React from 'react';
import { Link } from "react-router-dom";

const SimilarRecipesModal = ({ isOpen, onClose, recipes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-3/4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Similar Recipes</h2>
        <div className="flex-grow overflow-y-auto">
          {recipes.length === 0 ? (
            <p>No similar recipes found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {recipes.map((r) => (
                <div key={r.id} className="bg-gray-100 p-3 rounded-lg flex items-center space-x-4">
                  <img src={r.imageUrl} alt={r.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <Link to={`/recipe/${r.id}`} onClick={onClose}>
                      <h3 className="text-lg font-bold">{r.name}</h3>
                      <p className="text-sm text-gray-600">
                        {r.time} mins · {r.difficulty} · {r.dietType}
                      </p>
                      {r.score > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Common ingredients: {r.score}
                        </p>
                      )}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarRecipesModal;

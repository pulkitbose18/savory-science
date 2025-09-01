import React, { useState } from 'react';
import allowedIngredients from '../utils/allowedIngredients';

const IngredientModal = ({ isOpen, onClose, onSelect }) => {
  const [selected, setSelected] = useState([]);

  if (!isOpen) return null;

  const handleSelect = (ingredient) => {
    if (selected.includes(ingredient)) {
      setSelected(selected.filter((i) => i !== ingredient));
    } else {
      setSelected([...selected, ingredient]);
    }
  };

  const handleDone = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-3/4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Select Ingredients</h2>
        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-3 gap-2">
            {allowedIngredients.map((ingredient) => (
              <label key={ingredient} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selected.includes(ingredient)}
                  onChange={() => handleSelect(ingredient)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{ingredient}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleDone}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Done
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;
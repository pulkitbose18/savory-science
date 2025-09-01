# Smart Recipe Generator

This is a web application that helps users find recipes based on the ingredients they have. It allows users to input ingredients, filter recipes by various criteria, and save their favorite recipes.

## Features

*   **Ingredient Input:**
    *   Enter ingredients manually (comma-separated).
    *   Select ingredients from a predefined list.
*   **Recipe Search & Filtering:**
    *   Search recipes by name.
    *   Filter by diet type (Vegetarian, Non-Vegetarian, Vegan, Vegetarian (Egg)).
    *   Filter by difficulty (Easy, Medium, Hard).
    *   Filter by cooking time (Under 30 mins, 30-60 mins, Over 60 mins).
    *   Filter by Gluten-Free option.
*   **Recipe Details:**
    *   View detailed instructions and nutritional information for each recipe.
    *   Get ingredient substitution suggestions.
    *   Adjust serving sizes.
*   **Favorites:**
    *   Save and manage favorite recipes.
    *   Find similar recipes based on ingredients of favorite recipes.
*   **User Feedback:**
    *   Rate recipes.
*   **Responsive Design:**
    *   The application is designed to be mobile-responsive.

## Project Structure

```
smart-recipe/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── App.css
│   ├── assets/
│   ├── components/
│   │   ├── IngredientModal.jsx
│   │   └── SimilarRecipesModal.jsx
│   ├── data/
│   │   └── recipes.js
│   ├── pages/
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── IngredientInput.jsx
│   │   └── RecipeDetail.jsx
│   └── utils/
│       ├── allowedIngredients.js
│       ├── ingredientMap.js
│       └── labelMap.js
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd smart-recipe
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

This application can be easily deployed to Netlify. See [Netlify Deployment Guide](#netlify-deployment-guide) for detailed instructions.

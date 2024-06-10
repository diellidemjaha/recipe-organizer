import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_RECIPES_QUERY = gql`
  query GetRecipes {
    getRecipes {
      id
      title
      ingredients
      steps
      tags
      image_path
      user {
        id
        name
      }
    }
  }
`;

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const RecipeList = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPES_QUERY);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error loading recipes. Please try again later.</p>;
  }

  const recipes = data.getRecipes;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-4">Recipe List</h1>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white p-4 rounded-md shadow-md">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/storage/images/${recipe.image_path}`}
                alt={`Image for ${recipe.title}`}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-700">{recipe.ingredients}</p>
              <div className="mt-4">
                  <p className="text-blue-500 cursor-pointer" onClick={() => navigate(`/user-recipes/${recipe.user.id}`)}>
                  Posted by: {recipe.user.name}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;

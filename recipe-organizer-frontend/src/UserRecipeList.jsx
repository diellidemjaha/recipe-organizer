import React from "react";
import { useNavigate } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';


const GET_USER_RECIPES_QUERY = gql`
  query GetUserRecipes {
    getUserRecipes {
      id
      title
      ingredients
      steps
      tags
      image_path
      created_at
      updated_at
    }
  }
`;

export const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
      title
      ingredients
      steps
      tags
      image_path
    }
  }
  `;
  
  
  
  const UserRecipeList = () => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    const [deleteRecipeMutation] = useMutation(DELETE_RECIPE_MUTATION);
  const { loading, error, data, refetch } = useQuery(GET_USER_RECIPES_QUERY, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error loading recipes. Please try again later.</p>;
  }

  const recipes = data.getUserRecipes;


  const handleEditRecipe = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  const handleDeleteRecipe = (recipeId, deleteRecipeMutation) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem('token');
        const { data, errors } = await deleteRecipeMutation({
          variables: { id: recipeId },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          },
        });
  
        if (data.deleteRecipe) {
          console.log('Recipe deleted:', data.deleteRecipe);
          resolve(data.deleteRecipe);
        } else {
          console.error('Error deleting recipe:', errors);
          reject(errors);
        }
      } catch (error) {
        console.error('GraphQL Error:', error);
        reject(error);
      }
    });
  };


  const handleDelete = async (recipeId) => {
    try {
      await handleDeleteRecipe(recipeId, deleteRecipeMutation);
      refetch();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-4">Your Recipe's</h1>
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
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  View
                </button>
                <button
                  className="bg-blue-500 text-white m-3 px-4 py-2 rounded-md"
                  onClick={() => handleEditRecipe(recipe.id)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(recipe.id)}>Delete Recipe</button>
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

export default UserRecipeList;

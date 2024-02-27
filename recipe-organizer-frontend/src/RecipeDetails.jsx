import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

// Define the GraphQL query to fetch a single recipe by ID
const GET_RECIPE_DETAILS = gql`
  query GetRecipeDetails($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      ingredients
      steps
      tags
      image_path
    }
  }
`;

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const RecipeDetails = () => {
  const { id } = useParams();
  // Use the useQuery hook to fetch recipe details
  const { loading, error, data } = useQuery(GET_RECIPE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error.message}</p>;

  const recipe = data.getRecipe;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="mb-2">Ingredients: {recipe.ingredients}</p>
      <p className="mb-2">Steps: {recipe.steps}</p>
      <p className="mb-2">Tags:</p>
    <b><ul>
      {recipe.tags.map((tag, index) => (
        <li key={index}>{tag}</li>
      ))}
    </ul></b>
      
      {recipe.image_path && (
        <div>
          {/* <p className="mb-2">Image:</p> */}
          <img 
          src={`${import.meta.env.VITE_API_BASE_URL}/storage/images/${recipe.image_path}`}
          alt={`Image for ${recipe.title}`} className="max-w-full rounded-md" />
        </div>
      )}

      {/* Add more details as needed */}
    </div>
  );
};

export default RecipeDetails;

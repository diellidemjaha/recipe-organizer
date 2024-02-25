import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

export const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      id
      title
      ingredients
      steps
      tags
      image_path
    }
  }
`;

const RecipeUpdateForm = ({ recipe, onSubmit }) => {
  // const [title, setTitle] = useState(recipe.title || '');
  // const [ingredients, setIngredients] = useState(recipe.ingredients || '');
  // const [steps, setSteps] = useState(recipe.steps || '');

  const [updateRecipeMutation] = useMutation(UPDATE_RECIPE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateRecipeMutation({
        variables: {
          id: recipe.id,
          input: {
            title,
            ingredients,
            steps,
          },
        },
      });

      // Assuming updateRecipe mutation returns the updated recipe
      const updatedRecipe = data.updateRecipe;

      onSubmit(updatedRecipe);

      // Clear form fields or handle submission as needed
      setTitle('');
      setIngredients('');
      setSteps('');
    } catch (error) {
      console.error(error);
      // Handle submission error
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Title:
    //     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    //   </label>
    //   <label>
    //     Ingredients:
    //     <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
    //   </label>
    //   <label>
    //     Steps:
    //     <textarea value={steps} onChange={(e) => setSteps(e.target.value)} />
    //   </label>
    //   <button type="submit">Update Recipe</button>
    // </form>
    <h1>Update Recipe Form</h1>
  );
};

export default RecipeUpdateForm;

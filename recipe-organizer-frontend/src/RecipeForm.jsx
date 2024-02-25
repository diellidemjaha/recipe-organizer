import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
      title
      ingredients
      steps
      tags
      image_path
    }
  }
`;

const RecipeForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const [createRecipeMutation] = useMutation(CREATE_RECIPE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createRecipeMutation({
        variables: {
          input: {
            title,
            ingredients,
            steps,
          },
        },
      });

      // Assuming createRecipe mutation returns the created recipe
      const createdRecipe = data.createRecipe;

      onSubmit(createdRecipe);

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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Ingredients:
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </label>
      <label>
        Steps:
        <textarea value={steps} onChange={(e) => setSteps(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;

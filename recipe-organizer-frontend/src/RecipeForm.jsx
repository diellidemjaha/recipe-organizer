import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import ImageUploaderModal from './ImageUploaderModal';

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

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [tags, setTags] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createRecipeMutation] = useMutation(CREATE_RECIPE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const { data, errors } = await createRecipeMutation({
        variables: {
          input: {
            title,
            ingredients,
            steps,
            tags,
            image_path: null,
          },
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });

      const createdRecipe = data.createRecipe;

      if (createdRecipe) {
        console.log('Recipe created:', createdRecipe);
        setCurrentRecipeId(createdRecipe.id);
        setFormSubmitted(true);
        setIsModalOpen(true); // Open the modal after successful submission
      } else {
        console.error('Error creating recipe:', errors);
      }
    } catch (error) {
      console.error('GraphQL Error:', error);
    }
  };

  const handleTagsChange = (e) => {
    const newTags = e.target.value.split(',');
    setTags(newTags);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <h1 className="text-4xl font-bold mb-5">Recipe Organizer</h1>

        {/* Input fields for the recipe */}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
          Ingredients:
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Recipe Ingredients"
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="steps">
          Steps:
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Recipe Steps"
          />
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tags:
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tags}
            onChange={handleTagsChange}
          />
        </label>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* Modal for ImageUploader */}
      {formSubmitted && isModalOpen && (
        <ImageUploaderModal recipeId={currentRecipeId} onClose={closeModal} />
      )}
    </div>
  );
};

export default RecipeForm;

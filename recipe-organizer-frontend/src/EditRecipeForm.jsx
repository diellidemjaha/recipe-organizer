import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import ImageUploaderModal from './ImageUploaderModal';
import { useParams } from 'react-router-dom';


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

const GET_RECIPE_QUERY = gql`
  query GetRecipe($id: ID!) {
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

const EditRecipeForm = ({ recipeId }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [tags, setTags] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_RECIPE_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.getRecipe) {
      const { title, ingredients, steps, tags } = data.getRecipe;
      setTitle(title);
      setIngredients(ingredients);
      setSteps(steps);
      setTags(tags.join(', '));
    }
  }, [data?.getRecipe]);

  const [updateRecipeMutation] = useMutation(UPDATE_RECIPE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const { data, errors } = await updateRecipeMutation({
        variables: {
          id,
          input: {
            title,
            ingredients,
            steps,
            tags: tags.split(',').map((tag) => tag.trim()),
            image_path: null, // You may handle image update separately if needed
          },
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });

      const updatedRecipe = data.updateRecipe;

      if (updatedRecipe) {
        console.log('Recipe updated:', updatedRecipe);
        setFormSubmitted(true);
        setIsModalOpen(true); // Open the modal after successful submission
      } else {
        console.error('Error updating recipe:', errors);
      }
    } catch (error) {
      console.error('GraphQL Error:', error);
    }
  };

  const handleTagsChange = (e) => {
    const newTags = e.target.value;
    setTags(newTags);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error loading recipe. Please try again later.</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <h1 className="text-4xl font-bold mb-5">Edit Recipe</h1>

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
          Update Recipe
        </button>
      </form>

      {/* Modal for ImageUploader */}
      {formSubmitted && isModalOpen && (
        <ImageUploaderModal recipeId={id} onClose={closeModal} />
      )}
    </div>
  );
};

export default EditRecipeForm;

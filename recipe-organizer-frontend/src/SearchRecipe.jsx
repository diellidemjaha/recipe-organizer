import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SEARCH_RECIPE_MUTATION = gql`
  mutation SearchRecipe($input: SearchRecipeInput!) {
    searchRecipe(input: $input) {
      id
      title
      ingredients
      steps
      tags
      image_path
    }
  }
`;

const SearchRecipeForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [searchRecipeMutation] = useMutation(SEARCH_RECIPE_MUTATION);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const { data } = await searchRecipeMutation({
        variables: {
          input: {
            searchTerm,
          },
        },
      });

      // Assuming searchRecipe mutation returns the search results
      const searchResults = data.searchRecipe;

      onSearch(searchResults);

      // Clear form field or handle submission as needed
      setSearchTerm('');
    } catch (error) {
      console.error(error);
      // Handle search error
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <label>
        Search Term:
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchRecipeForm;

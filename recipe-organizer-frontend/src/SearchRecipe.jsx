import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const SEARCH_RECIPE_QUERY = gql`
  query SearchRecipe($title: String!) {
    searchRecipe(title: $title) {
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

const SearchRecipeForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data, refetch } = useQuery(SEARCH_RECIPE_QUERY, {
    variables: { title: searchTerm },
    fetchPolicy: 'network-only',
  });
  refetch();

  const handleSearch = () => {
    if (!loading && !error) {
      onSearch(data?.searchRecipe || []);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <label>
        Search Term:
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchRecipeForm;

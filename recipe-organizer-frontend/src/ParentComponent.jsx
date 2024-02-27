// ParentComponent.jsx

import React, { useState } from 'react';
import NavBar from './NavBar'; // Update the path based on your project structure
import SearchResults from './SearchResults'; // Update the path based on your project structure
import { useLazyQuery } from '@apollo/client';
import { SEARCH_RECIPE } from './SearchQuery'; // Import your GraphQL query

const ParentComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRecipe, { loading, error, data }] = useLazyQuery(SEARCH_RECIPE);

  const handleSearch = (title) => {
    setSearchTerm(title);
    searchRecipe({ variables: { title } });
  };

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <SearchResults recipes={data?.searchRecipe || []} />
    </div>
  );
};

export default ParentComponent;

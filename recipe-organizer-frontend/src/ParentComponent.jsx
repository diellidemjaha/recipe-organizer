// ParentComponent.jsx

import React, { useState } from 'react';
import NavBar from './NavBar';
import SearchResults from './SearchResults'; 
import { useLazyQuery } from '@apollo/client';
import { SEARCH_RECIPE } from './SearchQuery'; 

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

import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SearchResults from './SearchResults';
import NavBar from './NavBar';
import LoginComponent from './Login';
import RegisterComponent from './Register';
import RecipeForm from './RecipeForm';
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';
import RecipeUpdateForm from './UpdateRecipeForm';
import SearchRecipeForm from './SearchRecipe';
import { SEARCH_RECIPE } from './SearchQuery';
import { GET_ALL_RECIPES_QUERY } from './GetAllRecipesQuery';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const loggedIn = localStorage.getItem('token');
  const user = localStorage.getItem('user_id');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (title) => {
    try {
      // Fetch all recipes when the search term is empty
      const query = title ? SEARCH_RECIPE : GET_ALL_RECIPES_QUERY;

      const { data } = await client.query({
        query,
        variables: { title },
      });

      setSearchResults(data?.searchRecipe || []);
    } catch (error) {
      console.error('Error in the App component:', error);
    }
  };

  try {
  return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <NavBar onSearch={handleSearch} />
            <Routes>
              {/* Public route */}
              <Route path="/" element={<RecipeList />} />

              {/* Routes requiring authentication */}
              {loggedIn ? (
                <>
                  <Route path="/recipeform" element={<RecipeForm />} />
                  {/* <Route path="/imageuploader" element={<ImageUploader />} /> */}
                  <Route path="/recipe/:id" element={<RecipeDetails />} />
                  <Route path="/updaterecipeform" element={<RecipeUpdateForm />} />
                  <Route path="/searchrecipe" element={<SearchRecipeForm />} />
                  <Route path="/searchresults"  element={<SearchResults recipes={searchResults} />}/>
                </>
              ) : (
                <>
                  {/* Unauthenticated routes */}
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/register" element={<RegisterComponent />} />

                  {/* Redirect any unknown routes to login */}
                  <Route path="/*" element={<Navigate to="/login" />} />
                </>
              )}
            </Routes>
          </div>
        </Router>
        </ApolloProvider>
    );
  } catch (error) {
    console.error('Error during rendering App component:', error);
    return <div>Something went wrong. Please check the console for more information.</div>;
  }
}

export default App;

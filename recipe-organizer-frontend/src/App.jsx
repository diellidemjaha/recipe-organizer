import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import LoginComponent from './Login';
import RegisterComponent from './Register';
import RecipeForm from './RecipeForm';
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';
import RecipeUpdateForm from './UpdateRecipeForm';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import SearchRecipeForm from './SearchRecipe';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const loggedIn = localStorage.getItem('token');
  const user = localStorage.getItem('user_id');
  return (
    <>
     <ApolloProvider client={client}>
    <Router>
       <div>
        {/* <Navbar /> */}
      <Routes>
        {/* Public route */}
        <Route path="/" element={<RecipeList />} />

        {/* Routes requiring authentication */}
        {loggedIn ? (
          <>
            <Route path="/recipeform" element={<RecipeForm />} />
            <Route path="/recipedetails" element={<RecipeDetails />} />
            <Route path="/updaterecipeform" element={<RecipeUpdateForm />} />
            <Route path="/searchrecipe" element={<SearchRecipeForm />} />
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
    </>
  )
}

export default App

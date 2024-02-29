import { gql } from '@apollo/client';

export const SEARCH_RECIPE = gql`
  query SearchRecipe($title: String!) {
    searchRecipe(title: $title) {
      id
      title
      ingredients
      steps
      tags
      image_path
      created_at
      updated_at
      user {
        id
        name
      }
    }
  }
`;
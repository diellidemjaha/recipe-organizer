import { gql } from '@apollo/client';

export const GET_ALL_RECIPES_QUERY = gql`
query {
    getRecipes {
      id
      title
      ingredients
      steps
      tags
      image_path
      created_at
      updated_at
    }
  }
`;
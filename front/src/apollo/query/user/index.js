import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      favProductsId
      productsfav {
        id
        title
        description
        priceCurrent
        images
      }
      userProductsId
      productsUser {
        id
        title
        description
        priceCurrent
        images
      }
      userProductsId
    }
  }
`;
export const ADD_FAV = gql`
  mutation addFav($user: UserInput!, $product: ProductInput!) {
    addFav(user: $user, product: $product) {
      id
    }
  }
`;
export const REMOVE_FAV = gql`
  mutation removeFav($user: UserInput!, $product: ProductInput!) {
    removeFav(user: $user, product: $product) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      id
    }
  }
`;

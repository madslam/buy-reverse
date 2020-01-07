import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query {
    getProducts {
      id
      title
      description
      priceCurrent
      images
    }
  }
`;
export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    getProduct(id: $id) {
      id
      title
      description
      priceCurrent
      priceMax
      priceMin
      sellingTime
      images
      view
      fav
    }
  }
`;
export const CREATE_PRODUCT = gql`
  mutation createProduct($product: ProductInput!, $userId: String!) {
    createProduct(product: $product, userId: $userId) {
      id
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($product: ProductInput!, $userId: String!) {
    removeProduct(product: $product, userId: $userId) {
      id
    }
  }
`;

export const MODIFY_PRODUCT = gql`
  mutation modifyProduct($product: ProductInput!, $userId: String!) {
    modifyProduct(product: $product, userId: $userId) {
      id
    }
  }
`;

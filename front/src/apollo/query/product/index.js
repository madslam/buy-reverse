import {gql} from 'apollo-boost';

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
      images
      view
      fav
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($product: ProductInput!) {
    createProduct(product: $product) {
      id
    }
  }
`;

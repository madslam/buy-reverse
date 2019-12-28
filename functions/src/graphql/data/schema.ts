import {gql} from 'apollo-server-express';

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String
    priceCurrent: Float!
    priceMax: Float!
    priceMin: Float!
    sellingTime: Int!
    images: [String]
    view: Int!
    fav: Int!
  }
  type User {
    id: ID!
    favProduct: [String]
    listProduct: [String]
  }
  input UserInput {
    id: ID
    favProduct: [String]
    listProduct: [String]
  }
  input ProductInput {
    id: ID
    title: String!
    description: String
    priceCurrent: Float
    priceMax: Float
    priceMin: Float
    sellingTime: Int
    images: [String]
    view: Int
    fav: Int
  }
  type Query {
    getProducts: [Product]
    getUser(id: String): User
    getProduct(id: String): Product
  }
  type Mutation {
    createProduct(product: ProductInput!): Product
    createUser(user: UserInput!): User
    addFav(user: UserInput!, product: ProductInput!): User
    removeFav(user: UserInput!, product: ProductInput!): User
  }
`;

export default typeDefs;

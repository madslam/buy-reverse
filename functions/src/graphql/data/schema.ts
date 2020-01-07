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
    sellerId: String!
    seller: User
    avalaible: boolean!
  }
  type User {
    id: ID!
    favProductsId: [String]
    productsfav: [Product]
    userProductsId: [String]
    productsUser: [Product]
  }
  input UserInput {
    id: ID
    favProductsId: [String]
    productsfav: [ProductInput]
    userProductsId: [String]
    productsUser: [ProductInput]
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
    sellerId: String
    seller: UserInput
    avalaible: boolean!
  }
  type Query {
    getProducts: [Product]
    getUser(id: String): User
    getProduct(id: String): Product
  }
  type Mutation {
    createProduct(product: ProductInput!, userId: String!): Product
    modifyProduct(product: ProductInput!, userId: String!): Product
    removeProduct(product: ProductInput!, userId: String!): Product
    createUser(user: UserInput!): User
    addFav(user: UserInput!, product: ProductInput!): User
    removeFav(user: UserInput!, product: ProductInput!): User
  }
`;

export default typeDefs;

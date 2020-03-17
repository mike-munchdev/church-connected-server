const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date
  type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String!
    roles: [Role!]
    active: Boolean
  }

  type UsersResponse {
    ok: Boolean!
    users: [User]
    errors: [Error!]
  }
  type UserResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  input CreateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    active: Boolean!
    roleId: Int!
  }

  input UpdateUserInput {
    userId: Int!
    email: String
    firstName: String
    lastName: String
    active: Boolean
    roleId: Int
  }

  type Query {
    getUsers: UsersResponse
    getUser(userId: Int!): UserResponse
  }

  type Mutation {
    createNewUser(input: CreateUserInput): UserResponse
    updateOneUser(input: UpdateUserInput): UserResponse
  }
`;

module.exports = typeDefs;

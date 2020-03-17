const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type AuthResponse {
    ok: Boolean!
    accessToken: String
    firstName: String
    lastName: String
    roles: [Role!]
    errors: [Error!]
  }

  input AuthInput {
    accessToken: String!
  }

  input AuthInputLocal {
    email: String!
    password: String!
  }

  input SignupInputLocal {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input ResetPasswordInputLocal {
    email: String!
  }

  type Mutation {
    authLocal(input: AuthInputLocal!): AuthResponse
    signupLocal(input: SignupInputLocal!): AuthResponse
    resetPasswordLocal(input: ResetPasswordInputLocal!): AuthResponse
    logout: AuthResponse
  }
`;
module.exports = typeDefs;

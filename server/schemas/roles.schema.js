const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Role {
    id: Int!
    name: String!
    active: Boolean!
    slug: String!
    order: Int!
  }

  type RolesResponse {
    ok: Boolean!
    roles: [Role]
    errors: [Error!]
  }
  type RoleResponse {
    ok: Boolean!
    role: Role
    errors: [Error!]
  }

  type Query {
    getRoles: RolesResponse
  }
`;

module.exports = typeDefs;

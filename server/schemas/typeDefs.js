const { gql } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    updatedAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    me: User
  }

  scalar Amount

  type DonationResult {
    clientSecret: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!, commentAuthor: String!): Thought
    updateThought(thoughtId: ID!, thoughtText: String!): Thought!
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    donate(amount: Amount!): DonationResult!
  }
`;

module.exports = typeDefs;

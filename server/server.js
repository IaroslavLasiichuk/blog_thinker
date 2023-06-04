const express = require("express");
const path = require("path");
const cors = require('cors');
require("dotenv").config();
const { authMiddleware } = require('./utils/auth');

// Import the ApolloServer class
const { typeDefs, resolvers } = require("./schemas");
const { ApolloServer } = require("apollo-server-express");

const db = require("./config/connection");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: authMiddleware,
  persistedQueries: false
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "../client/build", "index.html"));
  });
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("Hello from Blog Thinker server");
// });

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`✅Server running on port http://localhost:${PORT}`);
      console.log(`💣Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
// Call the async function to start the server
startApolloServer();

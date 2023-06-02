const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.get("/", (req, res) => {
  res.send("Hello from Blog Thinker server");
});

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

startApolloServer();

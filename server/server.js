const express = require("express");
const path = require("path");
const cors = require('cors');
const nodemailer = require('nodemailer');
const compression = require('compression');
require("dotenv").config();
const { authMiddleware } = require('./utils/auth');
const { Form } = require('./models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Nodemailer
app.post('/send', async (req, res) => {
  try {
    // Save the form data to the database
    const newForm = await Form.create(req.body.mailerState);
    console.log(newForm);
    // Send the email
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD
      }
    });

    let mailDetails = {
      from: `This message from Thinker ${req.body.mailerState.email}`,
      to: process.env.EMAIL,
      subject: `Message from: ${req.body.mailerState.email}`,
      text: `Name: ${req.body.mailerState.name}.Message: ${req.body.mailerState.message}`
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
        // Send a failure response if email sending fails
        res.status(500).json({ status: 'fail' });
      } else {
        console.log('Email sent successfully from server');
        // Send a success response if email sending is successful
        res.status(200).json({ status: 'success' });
      }
    });
  } catch (err) {
    console.log(err);
    // Send a failure response if saving to the database fails
    res.status(500).json({ status: 'fail' });
  }
});

// Stripe
const DOMAIN = 'https://salty-eyrie-98942.herokuapp.com';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NHqnNIR6WFhZtkiBohdkKGP',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${DOMAIN}/success`,
    cancel_url: `${DOMAIN}/`,
  });

  res.redirect(303, session.url);
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
// Call the async function to start the server
startApolloServer();

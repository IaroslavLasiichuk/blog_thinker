const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
require("dotenv").config();
const { signToken } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async () => {
      return Thought.find().sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // createCheckoutSession: async (parent, args, context)=> {
    //   const url = new URL(context.headers.referer).origin;
      // const session = await stripe.checkout.session.create( {
      //   line_item:[
      //     {
      //       price: 'price_1NHW2PIR6WFhZtkiXbTW3iOL',
      //       quantity: 1
      //     }
      //   ],
      //   mode: 'payment',
      //   success_url: `${url}/success`,
      //   cancel_url: `${url}/cancel`
      // });
      // return JSON.stringify({
      //   url: session.url
      // });
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ['card'],
  //       line_items:[
  //             {
  //               price: 'price_1NHW2PIR6WFhZtkiXbTW3iOL',
  //               quantity: 1
  //             }
  //           ],
  //       mode: 'payment',
  //       success_url: `${url}/success}`,
  //       cancel_url: `${url}/`
  //     });

  //     return { session: session.id };
  //   }
    
  },

  Mutation: {
    
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      const context = {
        user: {
          _id: user._id,
          email: user.email,
          username: user.username, // Include the username property
        },
      };

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      console.log(context.user);
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { thoughtId, commentText, commentAuthor }, context) => {
      if (context.user) {
        try {
          // Find the thought by ID
          const thought = await Thought.findById(thoughtId);
  
          if (!thought) {
            throw new Error('Thought not found');
          }
  
          // Create a new comment object
          const newComment = {
            commentText,
            commentAuthor,
            createdAt: new Date(),
          };
  
          // Add the comment to the thought's comments array
          thought.comments.push(newComment);
  
          // Save the updated thought with the new comment
          await thought.save();
  
          return thought;
        } catch (error) {
          throw new Error('Failed to add comment');
        }
      }
  
      throw new AuthenticationError('You need to be logged in!');
    },
    updateThought: async (parent, { thoughtId, thoughtText }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      // Find the thought by its ID and check if it exists
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        throw new Error('Thought not found');
      }
      // Update the thoughtText field
      thought.thoughtText = thoughtText;
    
      // Save the updated thought to the database
      await thought.save();
    
      // Return the updated thought
      return thought;
    },

    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
  }
};

module.exports = resolvers;
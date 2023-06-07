const { Schema, model } = require('mongoose');

// Schema to create User model
const formSchema = new Schema({
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
    },
      message: {
        type: String,
        trim: true
      },
  }, {
    toJSON: {
      virtuals: true
    },
    id: false
  });

const Form = model('Form', formSchema);

module.exports = Form;
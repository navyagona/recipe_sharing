const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  description: String,
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB Local Connection
mongoose.connect('mongodb://127.0.0.1:27017/recipeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to Local MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Mongoose models
const User = require('./models/user');
const Recipe = require('./models/recipe');

// ✅ Register route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Registration failed. Server error.' });
  }
});

// ✅ Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed. Server error.' });
  }
});

// ✅ Get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// ✅ Add a new recipe
app.post('/recipes', async (req, res) => {
  try {
    const { title, ingredients, description, category } = req.body;
    const recipe = new Recipe({ title, ingredients, description, category, likes: 0 });
    await recipe.save();
    res.status(201).json({ message: 'Recipe added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add recipe' });
  }
});

// ✅ Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`📌 Server running on http://localhost:${PORT}`);
});

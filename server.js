const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Route to render the signup page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route to render the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route to handle form submission
app.post('/signup', (req, res) => {
  const { username, password, name, gender, email } = req.body;

  console.log('Received form submission:', req.body); // Debugging line

  const userData = `Name: ${name}, Gender: ${gender}, Email: ${email}, Username: ${username}, Password: ${password}\n`;
  fs.appendFile(path.join(__dirname, 'users.txt'), userData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error saving user data.');
    } else {
      res.send('Signup successful!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

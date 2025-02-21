const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!Array.isArray(data)) {
      throw new Error('Invalid input: data must be an array');
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /[a-zA-Z]/.test(item));

    // Find the highest alphabet (case-insensitive)
    const highest_alphabet = alphabets.length
      ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
      : [];

    // Response
    res.status(200).json({
      is_success: true,
      user_id: 'john_doe_17091999', // Replace with your full name and DOB
      email: 'john@xyz.com', // Replace with your college email
      roll_number: 'ABCD123', // Replace with your roll number
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      error: error.message,
    });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
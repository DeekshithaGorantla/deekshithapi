const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST method for /bfhl route
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    // You should dynamically generate user_id based on your logic
    const userId = "john_doe_17091999";  // Replace with dynamic user ID if needed
    const email = "john@xyz.com";        // Replace with dynamic email if needed
    const rollNumber = "ABCD123";         // Replace with dynamic roll number if needed

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    // Process the input array
    data.forEach(item => {
        if (/^\d+$/.test(item)) {  // Check if the item is a number
            numbers.push(item);
        } else if (/^[a-zA-Z]+$/.test(item)) {  // Check if the item is an alphabet
            alphabets.push(item);
            if (item === item.toLowerCase() && (highestLowercaseAlphabet === null || item > highestLowercaseAlphabet)) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    // Prepare the response object
    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    // Return the JSON response
    res.json(response);
});

// GET method for /bfhl route
app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1
    };
    res.status(200).json(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

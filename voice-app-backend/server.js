const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;



// Middleware
// app.use(cors()); // Allows your mobile app to talk to this server
app.use(cors({
    origin: '*', // For development, this allows all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json()); // Tells the server to expect JSON data
// Specific configuration is safer than just app.use(cors())

// Add this AFTER your middleware and BEFORE your routes
app.use(express.static('public')); 

// Replace your app.get('/') with this:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log(`dir nam = ${__dirname}`)
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
//     console.log(`dir nam = ${__dirname}`)
// });

// Or, add a simple test route for the root
// app.get('/', (req, res) => {
//     res.send('Server is running! Use your mobile app to send a POST request.');
// });

// The "Receive" Endpoint
app.post('/receive', (req, res) => {
    const userPhrase = req.body.phrase;

    if (!userPhrase) {
        return res.status(400).json({ error: "No phrase received" });
    }

    // This is where the magic happens!
    console.log(`>>> Received from mobile: "${userPhrase}"`);

    // Add your logic here (e.g., save to DB, trigger an action)
    
    res.json({ 
        message: "Phrase received successfully!", 
        echo: userPhrase 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`To test from mobile, use your computer's IP address instead of 'localhost'`);
});
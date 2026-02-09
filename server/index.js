const express = require('express');
const app = express();
app.use(express.json());

app.post('/receive-phrase', (req, res) => {
    const userPhrase = req.body.phrase;
    
    console.log("Phrase received from mobile:", userPhrase);
    
    // Logic: Save to database or trigger an action here
    
    res.status(200).send({
        status: "success",
        message: `Processed: ${userPhrase}`
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { getLocation } = require('./location');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// Serve static files with proper cache control
app.use(express.static(path.join(__dirname, '../public'), {
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'no-store');
  }
}));

// API endpoint to track location
app.post('/track', async (req, res) => {
    try {
        const { phone } = req.body;
        
        if (!phone) {
            return res.status(400).json({ error: 'Phone number is required' });
        }
        
        const locationData = await getLocation(phone);
        res.json(locationData);
    } catch (error) {
        console.error('Tracking error:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to track location' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

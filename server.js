const express = require('express');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/track', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        // Fetch location from IP
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        const data = response.data;

        const userData = {
            ip: ip,
            country: data.country_name || "Unknown",
            city: data.city || "Unknown",
            region: data.region || "Unknown",
            timestamp: new Date().toISOString()
        };

        // Save to a log file
        fs.appendFileSync('visitors.log', JSON.stringify(userData) + '\n');

        res.json({ success: true, message: "Data logged", userData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch location" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

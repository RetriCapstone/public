const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;  // Backend port

// Enable CORS for all requests to this server
app.use(cors());

// Parse JSON requests
app.use(express.json());

app.post('/run', async (req, res) => {
  try {
    const { script, stdin } = req.body;

    const payload = {
      clientId: "1621897a45206594f49f5b03fd4d3a45",       // Replace with your JDoodle client ID
      clientSecret: "cf6c7ab71a49582b79f09749e29a1af39ebea299a641a864cae3228f6418ab7a", // Replace with your JDoodle client secret
      script: script,
      stdin: stdin,
      language: "python3",
      versionIndex: "3"
    };

    const jdoodleResponse = await axios.post('https://api.jdoodle.com/v1/execute', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(jdoodleResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

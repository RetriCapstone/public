const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// const cors = require('cors');
// app.use(cors({ origin: '*' })); // Allow all origins for testing

app.use(express.json());

app.post('/run', async (req, res) => {
  try {
    const { script, stdin } = req.body;

    const payload = {
      clientId: "7f36670a7923c6bb02ed6d18ad233b7e",      
      clientSecret: "f09735af4ad1ce0b0111e62f8adf5858ab4ab4e120c70d921204d395707b804", 
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

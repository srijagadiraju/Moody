const express = require("express");
const { MongoClient } = require("mongodb");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config({ path: './.env' });

console.log("Loaded OpenAI API Key:", process.env.OPENAI_API_KEY);

const app = express();
const port = process.env.PORT || 5001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// MongoDB connection URI (replace with your own MongoDB URI)
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    // Example route
    app.get("/", (req, res) => {
      res.send("Moody API is running");
    });

    // Endpoint to generate questions based on mood
    app.post("/api/generate-questions", async (req, res) => {
      console.log("POST /api/generate-questions hit");
      const { mood } = req.body;
      console.log("Received mood:", mood);

      if (!mood) {
        console.log("No mood provided");
        return res.status(400).json({ error: "Mood is required" });
      }

      try {
        console.log("Sending request to OpenAI API...");
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `Generate questions based on the mood: ${mood}` }],
          max_tokens: 100,
        }, {
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Received response from OpenAI");

        const questions = response.data.choices[0].message.content.split("\n");
        res.json(questions);
      } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).json({ error: "Failed to fetch questions" });
      }
    });


    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Run the main function to connect to MongoDB
main();

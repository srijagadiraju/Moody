const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection URI (replace with your own MongoDB URI)
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    // Example route
    app.get("/", (req, res) => {
      res.send("Moody API is running");
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

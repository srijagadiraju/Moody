const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URI
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

    // Get the database and collection
    const db = client.db("moodyApp");
    const postsCollection = db.collection("posts");

    // API Routes
    app.get("/api/posts", async (req, res) => {
      try {
        const posts = await postsCollection.find().toArray();
        res.json(posts);
      } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
      }
    });

    app.post("/api/posts", async (req, res) => {
      try {
        const { subject, message } = req.body;
        if (!subject || !message) {
          return res
            .status(400)
            .json({ message: "Subject and message are required" });
        }

        const newPost = {
          subject,
          message,
          likes: 0,
          comments: [],
        };

        const result = await postsCollection.insertOne(newPost);
        res.status(201).json({ ...newPost, _id: result.insertedId });
      } catch (error) {
        res.status(400).json({ message: "Error adding post", error });
      }
    });

    app.put("/api/posts/:id/like", async (req, res) => {
      try {
        const postId = req.params.id;
        const result = await postsCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $inc: { likes: 1 } }
        );

        if (result.modifiedCount === 1) {
          res.json({ message: "Post liked" });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      } catch (error) {
        res.status(400).json({ message: "Error liking post", error });
      }
    });

    app.post("/api/posts/:id/comment", async (req, res) => {
      try {
        const postId = req.params.id;
        const { text } = req.body;

        if (!text) {
          return res.status(400).json({ message: "Comment text is required" });
        }

        const newComment = { text };

        const result = await postsCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $push: { comments: newComment } }
        );

        if (result.modifiedCount === 1) {
          res.json({ message: "Comment added" });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      } catch (error) {
        res.status(400).json({ message: "Error adding comment", error });
      }
    });

    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, "client/build")));

    // Catch-all route to serve React app for any unknown routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
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

// Srija
const { generateQuestions, generateActivities } = require("./generate");
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
const allowedOrigin = [
  "http://localhost:3000",
  "https://moody-j5f5.onrender.com",
];

// Middleware
app.use(
  cors({
    origin: allowedOrigin, // Allow specific origins
    methods: ["GET", "POST", "PUT"],
    credentials: true, // Allow credentials (cookies, HTTP auth)
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection URI
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let usersCollection, postsCollection;

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("moodyApp");
    usersCollection = db.collection("users");
    postsCollection = db.collection("posts");

    // Passport Configuration
    passport.use(
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          try {
            const user = await usersCollection.findOne({ email });
            if (!user) return done(null, false, { message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
              return done(null, false, { message: "Incorrect password" });

            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        done(null, user);
      } catch (err) {
        done(err);
      }
    });

    // Session Setup
    app.use(
      session({
        secret: process.env.SESSION_SECRET || "default_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 3600000, // 1 hour
          secure: process.env.NODE_ENV === "production", // Only secure in production
          sameSite: "none", // Ensure cookies work cross-site
        },
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // Middleware to check if a user is authenticated
    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.status(401).json({ message: "Unauthorized" });
    }

    // User Authentication Routes
    app.post("/api/signup", async (req, res) => {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        };
        await usersCollection.insertOne(newUser);
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err });
      }
    });

    app.post("/api/login", (req, res, next) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.logIn(user, (err) => {
          if (err) return next(err);
          res.status(200).json({ message: "Login successful", user });
        });
      })(req, res, next);
    });

    app.get("/api/logout", (req, res) => {
      req.logout((err) => {
        if (err) {
          console.error("Error logging out:", err);
          return res
            .status(500)
            .json({ message: "Error logging out", error: err.message });
        }

        req.session.destroy((sessionErr) => {
          if (sessionErr) {
            console.error("Error destroying session:", sessionErr);
            return res.status(500).json({
              message: "Error clearing session",
              error: sessionErr.message,
            });
          }
          res.clearCookie("connect.sid", { path: "/" }); // Clear the session cookie
          console.log("User successfully logged out.");
          res.status(200).json({ message: "Logout successful" });
        });
      });
    });

    // API to check authentication status
    app.get("/api/check-auth", (req, res) => {
      if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
      } else {
        res.status(401).json({ message: "Not authenticated" });
      }
    });

    // Community Page Routes
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

    // Question and Activity Generation Routes
    app.post("/generate-questions", async (req, res) => {
      try {
        const questions = await generateQuestions(req);
        res.json(questions);
      } catch (error) {
        res.status(500).json({
          error: "An error occurred while generating questions",
          details: error.message,
        });
      }
    });

    app.post("/generate-activities", async (req, res) => {
      try {
        const activities = await generateActivities(req);
        res.json(activities);
      } catch (error) {
        res.status(500).json({
          error: "An error occurred while generating activities",
          details: error.message,
        });
      }
    });

    // Serve static files from React app
    app.use(express.static(path.join(__dirname, "client/build")));
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

main();

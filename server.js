// // // const express = require("express");
// // // const path = require("path");
// // // const { MongoClient, ObjectId } = require("mongodb");
// // // require("dotenv").config();

// // // const app = express();
// // // const port = process.env.PORT || 5001;

// // // // Middleware to parse JSON
// // // app.use(express.json());

// // // // MongoDB connection URI
// // // const uri = process.env.MONGO_URI;

// // // // Create a new MongoClient
// // // const client = new MongoClient(uri, {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true,
// // // });

// // // async function main() {
// // //   try {
// // //     // Connect to the MongoDB cluster
// // //     await client.connect();
// // //     console.log("Connected to MongoDB");

// // //     // Get the database and collection
// // //     const db = client.db("moodyApp");
// // //     const postsCollection = db.collection("posts");

// // //     // API Routes
// // //     app.get("/api/posts", async (req, res) => {
// // //       try {
// // //         const posts = await postsCollection.find().toArray();
// // //         res.json(posts);
// // //       } catch (error) {
// // //         res.status(500).json({ message: "Error fetching posts", error });
// // //       }
// // //     });

// // //     app.post("/api/posts", async (req, res) => {
// // //       try {
// // //         const { subject, message } = req.body;
// // //         if (!subject || !message) {
// // //           return res
// // //             .status(400)
// // //             .json({ message: "Subject and message are required" });
// // //         }

// // //         const newPost = {
// // //           subject,
// // //           message,
// // //           likes: 0,
// // //           comments: [],
// // //         };

// // //         const result = await postsCollection.insertOne(newPost);
// // //         res.status(201).json({ ...newPost, _id: result.insertedId });
// // //       } catch (error) {
// // //         res.status(400).json({ message: "Error adding post", error });
// // //       }
// // //     });

// // //     app.put("/api/posts/:id/like", async (req, res) => {
// // //       try {
// // //         const postId = req.params.id;
// // //         const result = await postsCollection.updateOne(
// // //           { _id: new ObjectId(postId) },
// // //           { $inc: { likes: 1 } }
// // //         );

// // //         if (result.modifiedCount === 1) {
// // //           res.json({ message: "Post liked" });
// // //         } else {
// // //           res.status(404).json({ message: "Post not found" });
// // //         }
// // //       } catch (error) {
// // //         res.status(400).json({ message: "Error liking post", error });
// // //       }
// // //     });

// // //     app.post("/api/posts/:id/comment", async (req, res) => {
// // //       try {
// // //         const postId = req.params.id;
// // //         const { text } = req.body;

// // //         if (!text) {
// // //           return res.status(400).json({ message: "Comment text is required" });
// // //         }

// // //         const newComment = { text };

// // //         const result = await postsCollection.updateOne(
// // //           { _id: new ObjectId(postId) },
// // //           { $push: { comments: newComment } }
// // //         );

// // //         if (result.modifiedCount === 1) {
// // //           res.json({ message: "Comment added" });
// // //         } else {
// // //           res.status(404).json({ message: "Post not found" });
// // //         }
// // //       } catch (error) {
// // //         res.status(400).json({ message: "Error adding comment", error });
// // //       }
// // //     });

// // //     // Serve static files from the React app
// // //     app.use(express.static(path.join(__dirname, "client/build")));

// // //     // Catch-all route to serve React app for any unknown routes
// // //     app.get("*", (req, res) => {
// // //       res.sendFile(path.join(__dirname, "client/build", "index.html"));
// // //     });

// // //     // Start the server
// // //     app.listen(port, () => {
// // //       console.log(`Server is running on port ${port}`);
// // //     });
// // //   } catch (error) {
// // //     console.error("MongoDB connection error:", error);
// // //   }
// // // }

// // // // Run the main function to connect to MongoDB
// // // main();

// // const express = require("express");
// // const path = require("path");
// // const session = require("express-session");
// // const passport = require("passport");
// // const LocalStrategy = require("passport-local").Strategy;
// // const bcrypt = require("bcryptjs");
// // const { MongoClient, ObjectId } = require("mongodb");
// // require("dotenv").config();

// // const app = express();
// // const port = process.env.PORT || 5001;

// // // Middleware to parse JSON
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // MongoDB connection URI
// // const uri = process.env.MONGO_URI;

// // // Create a new MongoClient
// // const client = new MongoClient(uri, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // let usersCollection, postsCollection;

// // async function main() {
// //   try {
// //     // Connect to the MongoDB cluster
// //     await client.connect();
// //     console.log("Connected to MongoDB");

// //     // Get the database and collections
// //     const db = client.db("moodyApp");
// //     usersCollection = db.collection("users");
// //     postsCollection = db.collection("posts");

// //     // Passport Configuration
// //     passport.use(
// //       new LocalStrategy(
// //         { usernameField: "email" },
// //         async (email, password, done) => {
// //           try {
// //             const user = await usersCollection.findOne({ email });
// //             if (!user) return done(null, false, { message: "User not found" });

// //             const isMatch = await bcrypt.compare(password, user.password);
// //             if (!isMatch)
// //               return done(null, false, { message: "Incorrect password" });

// //             return done(null, user);
// //           } catch (err) {
// //             return done(err);
// //           }
// //         }
// //       )
// //     );

// //     passport.serializeUser((user, done) => done(null, user._id));
// //     passport.deserializeUser(async (id, done) => {
// //       try {
// //         const user = await usersCollection.findOne({ _id: new ObjectId(id) });
// //         done(null, user);
// //       } catch (err) {
// //         done(err);
// //       }
// //     });

// //     // Session Setup
// //     app.use(
// //       session({
// //         secret: process.env.SESSION_SECRET || "secret",
// //         resave: false,
// //         saveUninitialized: false,
// //         cookie: { maxAge: 3600000 }, // 1 hour session
// //       })
// //     );
// //     app.use(passport.initialize());
// //     app.use(passport.session());

// //     // API Routes for User Authentication
// //     app.post("/api/signup", async (req, res) => {
// //       const { firstName, lastName, email, password } = req.body;
// //       if (!firstName || !lastName || !email || !password) {
// //         return res.status(400).json({ message: "All fields are required" });
// //       }

// //       try {
// //         const existingUser = await usersCollection.findOne({ email });
// //         if (existingUser) {
// //           return res.status(400).json({ message: "Email already registered" });
// //         }

// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         const newUser = {
// //           firstName,
// //           lastName,
// //           email,
// //           password: hashedPassword,
// //         };
// //         await usersCollection.insertOne(newUser);
// //         res.status(201).json({ message: "User registered successfully" });
// //       } catch (err) {
// //         res.status(500).json({ message: "Error registering user", error: err });
// //       }
// //     });

// //     app.post("/api/login", passport.authenticate("local"), (req, res) => {
// //       res.status(200).json({ message: "Login successful", user: req.user });
// //     });

// //     app.get("/api/logout", (req, res) => {
// //       req.logout((err) => {
// //         if (err) return res.status(500).json({ message: "Error logging out" });
// //         res.status(200).json({ message: "Logout successful" });
// //       });
// //     });

// //     // API Routes for Community Page
// //     app.get("/api/posts", async (req, res) => {
// //       try {
// //         const posts = await postsCollection.find().toArray();
// //         res.json(posts);
// //       } catch (error) {
// //         res.status(500).json({ message: "Error fetching posts", error });
// //       }
// //     });

// //     app.post("/api/posts", async (req, res) => {
// //       try {
// //         const { subject, message } = req.body;
// //         if (!subject || !message) {
// //           return res
// //             .status(400)
// //             .json({ message: "Subject and message are required" });
// //         }

// //         const newPost = {
// //           subject,
// //           message,
// //           likes: 0,
// //           comments: [],
// //         };

// //         const result = await postsCollection.insertOne(newPost);
// //         res.status(201).json({ ...newPost, _id: result.insertedId });
// //       } catch (error) {
// //         res.status(400).json({ message: "Error adding post", error });
// //       }
// //     });

// //     app.put("/api/posts/:id/like", async (req, res) => {
// //       try {
// //         const postId = req.params.id;
// //         const result = await postsCollection.updateOne(
// //           { _id: new ObjectId(postId) },
// //           { $inc: { likes: 1 } }
// //         );

// //         if (result.modifiedCount === 1) {
// //           res.json({ message: "Post liked" });
// //         } else {
// //           res.status(404).json({ message: "Post not found" });
// //         }
// //       } catch (error) {
// //         res.status(400).json({ message: "Error liking post", error });
// //       }
// //     });

// //     app.post("/api/posts/:id/comment", async (req, res) => {
// //       try {
// //         const postId = req.params.id;
// //         const { text } = req.body;

// //         if (!text) {
// //           return res.status(400).json({ message: "Comment text is required" });
// //         }

// //         const newComment = { text };

// //         const result = await postsCollection.updateOne(
// //           { _id: new ObjectId(postId) },
// //           { $push: { comments: newComment } }
// //         );

// //         if (result.modifiedCount === 1) {
// //           res.json({ message: "Comment added" });
// //         } else {
// //           res.status(404).json({ message: "Post not found" });
// //         }
// //       } catch (error) {
// //         res.status(400).json({ message: "Error adding comment", error });
// //       }
// //     });

// //     // Serve static files from the React app
// //     app.use(express.static(path.join(__dirname, "client/build")));

// //     // Catch-all route to serve React app for any unknown routes
// //     app.get("*", (req, res) => {
// //       res.sendFile(path.join(__dirname, "client/build", "index.html"));
// //     });

// //     // Start the server
// //     app.listen(port, () => {
// //       console.log(`Server is running on port ${port}`);
// //     });
// //   } catch (error) {
// //     console.error("MongoDB connection error:", error);
// //   }
// // }

// // // Run the main function to connect to MongoDB
// // main();

// // const express = require("express");
// // const path = require("path");
// // const session = require("express-session");
// // const passport = require("passport");
// // const LocalStrategy = require("passport-local").Strategy;
// // const bcrypt = require("bcryptjs");
// // const { MongoClient, ObjectId } = require("mongodb");
// // require("dotenv").config();

// // const app = express();
// // const port = process.env.PORT || 5001;

// // // Middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // MongoDB connection URI
// // const uri = process.env.MONGO_URI;

// // // Create a new MongoClient
// // const client = new MongoClient(uri, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // let usersCollection, postsCollection;

// // async function main() {
// //   try {
// //     // Connect to MongoDB
// //     await client.connect();
// //     console.log("Connected to MongoDB");

// //     const db = client.db("moodyApp");
// //     usersCollection = db.collection("users");
// //     postsCollection = db.collection("posts");

// //     // Passport Configuration
// //     passport.use(
// //       new LocalStrategy(
// //         { usernameField: "email" },
// //         async (email, password, done) => {
// //           try {
// //             const user = await usersCollection.findOne({ email });
// //             if (!user) return done(null, false, { message: "User not found" });

// //             const isMatch = await bcrypt.compare(password, user.password);
// //             if (!isMatch)
// //               return done(null, false, { message: "Incorrect password" });

// //             return done(null, user);
// //           } catch (err) {
// //             return done(err);
// //           }
// //         }
// //       )
// //     );

// //     passport.serializeUser((user, done) => done(null, user._id));
// //     passport.deserializeUser(async (id, done) => {
// //       try {
// //         const user = await usersCollection.findOne({ _id: new ObjectId(id) });
// //         done(null, user);
// //       } catch (err) {
// //         done(err);
// //       }
// //     });

// //     // Session Setup
// //     app.use(
// //       session({
// //         secret: process.env.SESSION_SECRET || "default_secret_key",
// //         resave: false,
// //         saveUninitialized: false,
// //         cookie: { maxAge: 3600000 },
// //       })
// //     );
// //     app.use(passport.initialize());
// //     app.use(passport.session());

// //     // User Authentication Routes
// //     app.post("/api/signup", async (req, res) => {
// //       const { firstName, lastName, email, password } = req.body;
// //       if (!firstName || !lastName || !email || !password) {
// //         return res.status(400).json({ message: "All fields are required" });
// //       }

// //       try {
// //         const existingUser = await usersCollection.findOne({ email });
// //         if (existingUser) {
// //           return res.status(400).json({ message: "Email already registered" });
// //         }

// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         const newUser = {
// //           firstName,
// //           lastName,
// //           email,
// //           password: hashedPassword,
// //         };
// //         await usersCollection.insertOne(newUser);
// //         res.status(201).json({ message: "User registered successfully" });
// //       } catch (err) {
// //         res.status(500).json({ message: "Error registering user", error: err });
// //       }
// //     });

// //     app.post("/api/login", (req, res, next) => {
// //       passport.authenticate("local", (err, user, info) => {
// //         if (err) return next(err);
// //         if (!user) return res.status(400).json({ message: info.message });

// //         req.logIn(user, (err) => {
// //           if (err) return next(err);
// //           res.status(200).json({ message: "Login successful", user });
// //         });
// //       })(req, res, next);
// //     });

// //     app.get("/api/logout", (req, res) => {
// //       req.logout((err) => {
// //         if (err) return res.status(500).json({ message: "Error logging out" });
// //         res.status(200).json({ message: "Logout successful" });
// //       });
// //     });

// //     // Community Page Routes
// //     app.get("/api/posts", async (req, res) => {
// //       try {
// //         const posts = await postsCollection.find().toArray();
// //         res.json(posts);
// //       } catch (error) {
// //         res.status(500).json({ message: "Error fetching posts", error });
// //       }
// //     });

// //     app.post("/api/posts", async (req, res) => {
// //       try {
// //         const { subject, message } = req.body;
// //         if (!subject || !message) {
// //           return res
// //             .status(400)
// //             .json({ message: "Subject and message are required" });
// //         }

// //         const newPost = {
// //           subject,
// //           message,
// //           likes: 0,
// //           comments: [],
// //         };

// //         const result = await postsCollection.insertOne(newPost);
// //         res.status(201).json({ ...newPost, _id: result.insertedId });
// //       } catch (error) {
// //         res.status(400).json({ message: "Error adding post", error });
// //       }
// //     });

// //     app.put("/api/posts/:id/like", async (req, res) => {
// //       try {
// //         const postId = req.params.id;
// //         const result = await postsCollection.updateOne(
// //           { _id: new ObjectId(postId) },
// //           { $inc: { likes: 1 } }
// //         );

// //         if (result.modifiedCount === 1) {
// //           res.json({ message: "Post liked" });
// //         } else {
// //           res.status(404).json({ message: "Post not found" });
// //         }
// //       } catch (error) {
// //         res.status(400).json({ message: "Error liking post", error });
// //       }
// //     });

// //     app.post("/api/posts/:id/comment", async (req, res) => {
// //       try {
// //         const postId = req.params.id;
// //         const { text } = req.body;

// //         if (!text) {
// //           return res.status(400).json({ message: "Comment text is required" });
// //         }

// //         const newComment = { text };

// //         const result = await postsCollection.updateOne(
// //           { _id: new ObjectId(postId) },
// //           { $push: { comments: newComment } }
// //         );

// //         if (result.modifiedCount === 1) {
// //           res.json({ message: "Comment added" });
// //         } else {
// //           res.status(404).json({ message: "Post not found" });
// //         }
// //       } catch (error) {
// //         res.status(400).json({ message: "Error adding comment", error });
// //       }
// //     });

// //     // Serve static files from React app
// //     app.use(express.static(path.join(__dirname, "client/build")));
// //     app.get("*", (req, res) => {
// //       res.sendFile(path.join(__dirname, "client/build", "index.html"));
// //     });

// //     // Start the server
// //     app.listen(port, () => {
// //       console.log(`Server is running on port ${port}`);
// //     });
// //   } catch (error) {
// //     console.error("MongoDB connection error:", error);
// //   }
// // }

// // main();

// const express = require("express");
// const path = require("path");
// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
// const { MongoClient, ObjectId } = require("mongodb");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 5001;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB connection URI
// const uri = process.env.MONGO_URI;

// // Create a new MongoClient
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let usersCollection, postsCollection;

// async function main() {
//   try {
//     // Connect to MongoDB
//     await client.connect();
//     console.log("Connected to MongoDB");

//     const db = client.db("moodyApp");
//     usersCollection = db.collection("users");
//     postsCollection = db.collection("posts");

//     // Passport Configuration
//     passport.use(
//       new LocalStrategy(
//         { usernameField: "email" },
//         async (email, password, done) => {
//           try {
//             const user = await usersCollection.findOne({ email });
//             if (!user) return done(null, false, { message: "User not found" });

//             const isMatch = await bcrypt.compare(password, user.password);
//             if (!isMatch)
//               return done(null, false, { message: "Incorrect password" });

//             return done(null, user);
//           } catch (err) {
//             return done(err);
//           }
//         }
//       )
//     );

//     passport.serializeUser((user, done) => done(null, user._id));
//     passport.deserializeUser(async (id, done) => {
//       try {
//         const user = await usersCollection.findOne({ _id: new ObjectId(id) });
//         done(null, user);
//       } catch (err) {
//         done(err);
//       }
//     });

//     // Session Setup
//     app.use(
//       session({
//         secret: process.env.SESSION_SECRET || "default_secret_key",
//         resave: false,
//         saveUninitialized: false,
//         cookie: { maxAge: 3600000 },
//       })
//     );
//     app.use(passport.initialize());
//     app.use(passport.session());

//     // Middleware to check if a user is authenticated
//     function ensureAuthenticated(req, res, next) {
//       if (req.isAuthenticated()) {
//         return next();
//       }
//       res.status(401).json({ message: "Unauthorized" });
//     }

//     // Protected API Routes
//     app.get("/api/protected", ensureAuthenticated, (req, res) => {
//       res.status(200).json({ message: "You are authenticated!" });
//     });

//     // User Authentication Routes
//     app.post("/api/signup", async (req, res) => {
//       const { firstName, lastName, email, password } = req.body;
//       if (!firstName || !lastName || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       try {
//         const existingUser = await usersCollection.findOne({ email });
//         if (existingUser) {
//           return res.status(400).json({ message: "Email already registered" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = {
//           firstName,
//           lastName,
//           email,
//           password: hashedPassword,
//         };
//         await usersCollection.insertOne(newUser);
//         res.status(201).json({ message: "User registered successfully" });
//       } catch (err) {
//         res.status(500).json({ message: "Error registering user", error: err });
//       }
//     });

//     app.post("/api/login", (req, res, next) => {
//       passport.authenticate("local", (err, user, info) => {
//         if (err) return next(err);
//         if (!user) return res.status(400).json({ message: info.message });

//         req.logIn(user, (err) => {
//           if (err) return next(err);
//           res.status(200).json({ message: "Login successful", user });
//         });
//       })(req, res, next);
//     });

//     app.get("/api/logout", (req, res) => {
//       req.logout((err) => {
//         if (err) return res.status(500).json({ message: "Error logging out" });
//         res.status(200).json({ message: "Logout successful" });
//       });
//     });

//     // Community Page Routes
//     app.get("/api/posts", async (req, res) => {
//       try {
//         const posts = await postsCollection.find().toArray();
//         res.json(posts);
//       } catch (error) {
//         res.status(500).json({ message: "Error fetching posts", error });
//       }
//     });

//     app.post("/api/posts", async (req, res) => {
//       try {
//         const { subject, message } = req.body;
//         if (!subject || !message) {
//           return res
//             .status(400)
//             .json({ message: "Subject and message are required" });
//         }

//         const newPost = {
//           subject,
//           message,
//           likes: 0,
//           comments: [],
//         };

//         const result = await postsCollection.insertOne(newPost);
//         res.status(201).json({ ...newPost, _id: result.insertedId });
//       } catch (error) {
//         res.status(400).json({ message: "Error adding post", error });
//       }
//     });

//     app.put("/api/posts/:id/like", async (req, res) => {
//       try {
//         const postId = req.params.id;
//         const result = await postsCollection.updateOne(
//           { _id: new ObjectId(postId) },
//           { $inc: { likes: 1 } }
//         );

//         if (result.modifiedCount === 1) {
//           res.json({ message: "Post liked" });
//         } else {
//           res.status(404).json({ message: "Post not found" });
//         }
//       } catch (error) {
//         res.status(400).json({ message: "Error liking post", error });
//       }
//     });

//     app.post("/api/posts/:id/comment", async (req, res) => {
//       try {
//         const postId = req.params.id;
//         const { text } = req.body;

//         if (!text) {
//           return res.status(400).json({ message: "Comment text is required" });
//         }

//         const newComment = { text };

//         const result = await postsCollection.updateOne(
//           { _id: new ObjectId(postId) },
//           { $push: { comments: newComment } }
//         );

//         if (result.modifiedCount === 1) {
//           res.json({ message: "Comment added" });
//         } else {
//           res.status(404).json({ message: "Post not found" });
//         }
//       } catch (error) {
//         res.status(400).json({ message: "Error adding comment", error });
//       }
//     });

//     // Serve static files from React app
//     app.use(express.static(path.join(__dirname, "client/build")));
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "client/build", "index.html"));
//     });

//     // Start the server
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }

//   // Middleware to check if a user is authenticated
//   function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.status(401).json({ message: "Unauthorized" });
//   }

//   // API to check authentication status
//   app.get("/api/check-auth", (req, res) => {
//     if (req.isAuthenticated()) {
//       res.status(200).json({ user: req.user });
//     } else {
//       res.status(401).json({ message: "Not authenticated" });
//     }
//   });
// }

// main();

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
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
        cookie: { maxAge: 3600000 },
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

          // Return success response after login
          res.status(200).json({ message: "Login successful", user });
        });
      })(req, res, next);
    });

    app.get("/api/logout", (req, res) => {
      req.logout((err) => {
        if (err) return res.status(500).json({ message: "Error logging out" });
        res.status(200).json({ message: "Logout successful" });
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
    app.get("/api/posts", ensureAuthenticated, async (req, res) => {
      try {
        const posts = await postsCollection.find().toArray();
        res.json(posts);
      } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
      }
    });

    app.post("/api/posts", ensureAuthenticated, async (req, res) => {
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

    app.put("/api/posts/:id/like", ensureAuthenticated, async (req, res) => {
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

    app.post(
      "/api/posts/:id/comment",
      ensureAuthenticated,
      async (req, res) => {
        try {
          const postId = req.params.id;
          const { text } = req.body;

          if (!text) {
            return res
              .status(400)
              .json({ message: "Comment text is required" });
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
      }
    );

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

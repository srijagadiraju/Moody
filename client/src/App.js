import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout"; // Correct path to Layout.jsx
import LandingPage from "./pages/LandingPage";
import SignUpLoginPage from "./pages/SignUpLoginPage";
import MoodPage from "./pages/MoodPage";
import CommunityPage from "./pages/CommunityPage";
import Questions from "./pages/Questions";
import Activity from "./pages/Activity";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Layout> {/* Wrapping Routes with Layout */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpLoginPage />} />
          <Route path="/mood-selection" element={<MoodPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/activities" element={<Activity />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

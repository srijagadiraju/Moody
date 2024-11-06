import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpLoginPage from "./pages/SignUpLoginPage";
import MoodPage from "./pages/MoodPage";
import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpLoginPage />} />
          <Route path="/mood-selection" element={<MoodPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

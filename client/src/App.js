import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpLoginPage from "./pages/SignUpLoginPage";
import MoodPage from "./pages/MoodPage";
import CommunityPage from "./pages/CommunityPage";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import Questionnaire from "./pages/Questionnaire";
import ActivitySuggestions from "./pages/ActivitySuggestions";
import "./index.css";
import MeditationActivity from "./pages/MeditationActivity";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpLoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/mood-selection"
            element={
              <PrivateRoute>
                <MoodPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <CommunityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/generate-questions"
            element={
              <PrivateRoute>
                <Questionnaire />
              </PrivateRoute>
            }
          />
          <Route
            path="/generate-activities"
            element={
              <PrivateRoute>
                <ActivitySuggestions />
              </PrivateRoute>
            }
          />
          <Route
            path="/meditation"
            element={
              <PrivateRoute>
                <MeditationActivity />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import "../styles/Activity.css";

const Activity = () => {
  const activities = [
    { id: 1, name: "Meditation", icon: "🧘" },
    { id: 2, name: "Walking", icon: "🚶" },
    { id: 3, name: "Journaling", icon: "📝" },
    { id: 4, name: "Reading", icon: "📖" },
  ];

  const suggestions = [
    { id: 1, title: "Calm Beats", type: "Playlist" },
    { id: 2, title: "Mindfulness Now", type: "Podcast" },
    { id: 3, title: "Relaxation Mix", type: "Playlist" },
    { id: 4, title: "Mental Health Today", type: "Podcast" },
  ];

  return (
    <div className="activity-container">
      <header className="activity-header">
        <h1>Mood Activities</h1>
      </header>

      <div className="grid-container">
        <div className="activities-row">
          {activities.map((activity) => (
            <div key={activity.id} className="grid-item">
              <span className="activity-icon">{activity.icon}</span>
              <p>{activity.name}</p>
            </div>
          ))}
        </div>

        <div className="suggestions-row">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="grid-item">
              <p>{suggestion.title}</p>
              <small>{suggestion.type}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;

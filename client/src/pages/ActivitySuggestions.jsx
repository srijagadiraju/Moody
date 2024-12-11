// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import NavBar from "../components/NavBar";

// const ActivitySuggestions = () => {
//   const location = useLocation(); // Access the passed state
//   const { mood, answers } = location.state || {}; // Destructure mood and answers
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       if (!mood || !answers) {
//         setError("Invalid data provided. Please try again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(
//           "http://localhost:5001/generate-activities",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ mood, answers }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch activities");
//         }
//         const data = await response.json();
//         setActivities(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActivities();
//   }, [mood, answers]); // Re-fetch if mood or answers change

//   if (loading) {
//     return (
//       <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//         <div className="flex items-center justify-center p-8">
//           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//         <div className="text-center text-red-500 p-8">
//           <p>Error: {error}</p>
//           <button
//             onClick={() => window.location.reload()} // Retry by reloading the page
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const displayActivities =
//     activities.length > 0
//       ? activities
//       : [
//           {
//             title: "Guided Meditation",
//             description:
//               "A 10-minute session to calm your mind and reconnect with yourself",
//             icon: "🧘",
//           },
//           {
//             title: "Gentle Walk",
//             description: "Take a peaceful stroll to clear your thoughts",
//             icon: "🌳",
//           },
//           {
//             title: "Gratitude Journaling",
//             description: "Write down three things you're grateful for today",
//             icon: "📓",
//           },
//           {
//             title: "Deep Breathing Exercise",
//             description: "Practice calming breath work for 5 minutes",
//             icon: "🌬️",
//           },
//         ];

//   return (
//     <>
//       <NavBar />

//       <div className="w-full max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
//         <div className="mb-6">
//           <div className="flex items-center gap-2 mb-2">
//             <h2 className="text-2xl font-bold">Suggested Activities</h2>
//             {mood && (
//               <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                 Mood: {mood}
//               </span>
//             )}
//           </div>
//           <p className="text-gray-600">
//             Based on your mood and responses, here are some activities that
//             might help:
//           </p>
//         </div>

//         <div className="space-y-4">
//           {displayActivities.map((activity, index) => (
//             <div
//               key={index}
//               className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center gap-4">
//                 <span className="text-4xl">{activity.icon}</span>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold mb-1">
//                     {activity.title}
//                   </h3>
//                   <p className="text-gray-600">{activity.description}</p>
//                 </div>
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
//                   Start Activity
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ActivitySuggestions;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const ActivitySuggestions = () => {
  const location = useLocation();
  const { mood, answers } = location.state || {};
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      if (!mood || !answers) {
        setError("Invalid data provided. Please try again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          "https://moody-be.onrender.com/generate-activities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mood, answers }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [mood, answers]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center p-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center text-red-500 p-8">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleStartActivity = () => {
    navigate("/meditation");
  };

  const displayActivities =
    activities.length > 0
      ? activities
      : [
          {
            title: "Guided Meditation",
            description:
              "A 10-minute session to calm your mind and reconnect with yourself",
            icon: "🧘",
          },
          {
            title: "Gentle Walk",
            description: "Take a peaceful stroll to clear your thoughts",
            icon: "🌳",
          },
          {
            title: "Gratitude Journaling",
            description: "Write down three things you're grateful for today",
            icon: "📓",
          },
          {
            title: "Deep Breathing Exercise",
            description: "Practice calming breath work for 5 minutes",
            icon: "🌬️",
          },
        ];

  return (
    <>
      <NavBar />

      <div className="w-full max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">Suggested Activities</h2>
            {mood && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Mood: {mood}
              </span>
            )}
          </div>
          <p className="text-gray-600">
            Based on your mood and responses, here are some activities that
            might help:
          </p>
        </div>

        <div className="space-y-4">
          {displayActivities.map((activity, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{activity.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
                {index === 0 && (
                  <button
                    onClick={handleStartActivity}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Start Activity
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActivitySuggestions;

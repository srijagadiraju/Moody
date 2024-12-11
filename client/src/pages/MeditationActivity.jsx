import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react";
import NavBar from "../components/NavBar";

const BREATHING_CYCLE = 8000; // Default 8 seconds per breath cycle
const ANIMATION_DURATION = BREATHING_CYCLE / 2; // 4 seconds per phase

const PresetDurations = [
  { label: "5 min", value: 300 },
  { label: "10 min", value: 600 },
  { label: "15 min", value: 900 },
  { label: "20 min", value: 1200 },
];

export default function MeditationActivity() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [breathPhase, setBreathPhase] = useState("inhale");
  const [isMuted, setIsMuted] = useState(false);
  const [breathDuration, setBreathDuration] = useState(BREATHING_CYCLE);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const breathAnimationRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleMeditationComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathPhase((prevPhase) =>
        prevPhase === "inhale" ? "exhale" : "inhale"
      );
    }, breathDuration / 2);

    return () => clearInterval(breathingInterval);
  }, [breathDuration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(() => {
          setIsMuted(true);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  const handleMeditationComplete = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeLeft(duration);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    return ((duration - timeLeft) / duration) * 100;
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-900">
        <div className="w-full max-w-md rounded-xl shadow-lg p-8 bg-gray-800">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Meditation Space</h1>
          </div>

          {/* Timer Display */}
          <div className="relative mb-8">
            <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#374151"
                strokeWidth="5"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="5"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${
                  2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)
                }`}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-3xl font-bold fill-white"
              >
                {formatTime(timeLeft)}
              </text>
            </svg>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              <RotateCcw size={24} />
            </button>
            <button
              onClick={toggleMute}
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>

          {/* Duration Presets */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {PresetDurations.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  setDuration(preset.value);
                  setTimeLeft(preset.value);
                }}
                className={`p-2 rounded-lg text-sm font-medium transition-colors
                ${
                  duration === preset.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Breathing Guide */}
          <div
            ref={breathAnimationRef}
            className={`p-6 rounded-xl text-center transition-all duration-${ANIMATION_DURATION} transform
            ${
              breathPhase === "inhale"
                ? "bg-blue-900 scale-110"
                : "bg-green-900 scale-95"
            }`}
          >
            <p
              className={`text-xl font-medium ${
                breathPhase === "inhale" ? "text-blue-200" : "text-green-200"
              }`}
            >
              {breathPhase === "inhale" ? "Breathe In" : "Breathe Out"}
            </p>
          </div>

          {/* Breath Duration Control */}
          <div className="mt-8">
            <label className="text-white mb-2 block">
              Breath Cycle Duration: {breathDuration / 1000} seconds
            </label>
            <input
              type="range"
              min="3000"
              max="12000"
              step="1000"
              value={breathDuration}
              onChange={(e) => setBreathDuration(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <audio ref={audioRef} loop>
          <source src="/meditation-sound.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Volume2,
//   VolumeX,
//   Play,
//   Pause,
//   RotateCcw,
//   Moon,
//   Sun,
// } from "lucide-react";

// const BREATHING_CYCLE = 8000; // Default 8 seconds per breath cycle
// const ANIMATION_DURATION = BREATHING_CYCLE / 2; // 4 seconds per phase

// const PresetDurations = [
//   { label: "5 min", value: 300 },
//   { label: "10 min", value: 600 },
//   { label: "15 min", value: 900 },
//   { label: "20 min", value: 1200 },
// ];

// export default function MeditationActivity() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(300);
//   const [timeLeft, setTimeLeft] = useState(duration);
//   const [breathPhase, setBreathPhase] = useState("inhale");
//   const [isMuted, setIsMuted] = useState(false);
//   const [theme, setTheme] = useState("light");
//   const [breathDuration, setBreathDuration] = useState(BREATHING_CYCLE); // State to control breath duration
//   const audioRef = useRef(null);
//   const intervalRef = useRef(null);
//   const breathAnimationRef = useRef(null);

//   useEffect(() => {
//     if (isPlaying) {
//       intervalRef.current = window.setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             handleMeditationComplete();
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     } else if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isPlaying]);

//   useEffect(() => {
//     const breathingInterval = setInterval(() => {
//       setBreathPhase((prevPhase) =>
//         prevPhase === "inhale" ? "exhale" : "inhale"
//       );
//     }, breathDuration / 2); // Adjust breathing interval based on the breathDuration

//     return () => clearInterval(breathingInterval);
//   }, [breathDuration]);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = 0.3;
//       if (isPlaying && !isMuted) {
//         audioRef.current.play().catch(() => {
//           setIsMuted(true);
//         });
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying, isMuted]);

//   const handleMeditationComplete = () => {
//     clearInterval(intervalRef.current);
//     setIsPlaying(false);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const resetTimer = () => {
//     setIsPlaying(false);
//     setTimeLeft(duration);
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const getProgressPercentage = () => {
//     return ((duration - timeLeft) / duration) * 100;
//   };

//   return (
//     <div
//       className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
//         theme === "light" ? "bg-gray-50" : "bg-gray-900"
//       }`}
//     >
//       <div
//         className={`w-full max-w-md rounded-xl shadow-lg p-8 transition-colors duration-300 ${
//           theme === "light" ? "bg-white" : "bg-gray-800"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-8">
//           <h1
//             className={`text-2xl font-bold ${
//               theme === "light" ? "text-gray-800" : "text-white"
//             }`}
//           >
//             Meditation Space
//           </h1>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
//           </button>
//         </div>

//         {/* Timer Display */}
//         <div className="relative mb-8">
//           <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100">
//             <circle
//               cx="50"
//               cy="50"
//               r="45"
//               fill="none"
//               stroke="#e5e7eb"
//               strokeWidth="5"
//             />
//             <circle
//               cx="50"
//               cy="50"
//               r="45"
//               fill="none"
//               stroke="#3b82f6"
//               strokeWidth="5"
//               strokeDasharray={`${2 * Math.PI * 45}`}
//               strokeDashoffset={`${
//                 2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)
//               }`}
//               transform="rotate(-90 50 50)"
//               className="transition-all duration-1000"
//             />
//             <text
//               x="50"
//               y="50"
//               textAnchor="middle"
//               dominantBaseline="middle"
//               className={`text-3xl font-bold ${
//                 theme === "light" ? "fill-gray-800" : "fill-white"
//               }`}
//             >
//               {formatTime(timeLeft)}
//             </text>
//           </svg>
//         </div>

//         {/* Controls */}
//         <div className="flex justify-center gap-4 mb-8">
//           <button
//             onClick={togglePlay}
//             className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
//           >
//             {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//           </button>
//           <button
//             onClick={resetTimer}
//             className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//           >
//             <RotateCcw size={24} />
//           </button>
//           <button
//             onClick={toggleMute}
//             className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//           >
//             {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
//           </button>
//         </div>

//         {/* Duration Presets */}
//         <div className="grid grid-cols-4 gap-2 mb-8">
//           {PresetDurations.map((preset) => (
//             <button
//               key={preset.value}
//               onClick={() => {
//                 setDuration(preset.value);
//                 setTimeLeft(preset.value);
//               }}
//               className={`p-2 rounded-lg text-sm font-medium transition-colors
//                 ${
//                   duration === preset.value
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//             >
//               {preset.label}
//             </button>
//           ))}
//         </div>

//         {/* Breathing Guide */}
//         <div
//           ref={breathAnimationRef}
//           className={`p-6 rounded-xl text-center transition-all duration-${ANIMATION_DURATION} transform
//             ${
//               breathPhase === "inhale"
//                 ? "bg-blue-100 scale-110" // Make inhale phase bigger
//                 : "bg-green-100 scale-95"
//             }`}
//         >
//           <p
//             className={`text-xl font-medium ${
//               breathPhase === "inhale" ? "text-blue-800" : "text-green-800"
//             }`}
//           >
//             {breathPhase === "inhale" ? "Breathe In" : "Breathe Out"}
//           </p>
//         </div>

//         {/* Breath Duration Control */}
//         <div className="mt-8">
//           <label className="text-red-800 dark:text-white mb-2 block">
//             Breath Cycle Duration: {breathDuration / 1000} seconds
//           </label>
//           <input
//             type="range"
//             min="3000"
//             max="12000"
//             step="1000"
//             value={breathDuration}
//             onChange={(e) => setBreathDuration(parseInt(e.target.value))}
//             className="w-full"
//           />
//         </div>
//       </div>

//       <audio ref={audioRef} loop>
//         <source src="/meditation-sound.mp3" type="audio/mpeg" />
//       </audio>
//     </div>
//   );
// }

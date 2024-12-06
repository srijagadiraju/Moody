// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import '../styles/SignUpLoginPage.css';

// // const SignUpLoginPage = () => {
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     const initialIsSignUp = location.state?.isSignUp ?? true;
// //     const [isSignUp, setIsSignUp] = useState(initialIsSignUp);

// //     return (
// //         <div className="auth-container">
// //             <button className="back-arrow" onClick={() => navigate('/')}>← Back</button>
// //             <div className="toggle-buttons">
// //                 <button
// //                     className={`toggle-button ${isSignUp ? 'active' : ''}`}
// //                     onClick={() => setIsSignUp(true)}
// //                 >
// //                     Sign Up
// //                 </button>
// //                 <button
// //                     className={`toggle-button ${!isSignUp ? 'active' : ''}`}
// //                     onClick={() => setIsSignUp(false)}
// //                 >
// //                     Log In
// //                 </button>
// //             </div>
// //             <div className="form-container">
// //                 <form>
// //                     {isSignUp && (
// //                         <>
// //                             <input type="text" placeholder="First Name" required />
// //                             <input type="text" placeholder="Last Name" required />
// //                         </>
// //                     )}
// //                     <input type="email" placeholder="Email" required />
// //                     <input type="password" placeholder="Password" required />
// //                     <button type="submit">{isSignUp ? 'Register' : 'Login'}</button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SignUpLoginPage;

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/SignUpLoginPage.css";

// // const SignUpLoginPage = () => {
// //   const navigate = useNavigate();
// //   const [isSignUp, setIsSignUp] = useState(true);
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const endpoint = isSignUp ? "/api/signup" : "/api/login";
// //     const body = isSignUp
// //       ? formData
// //       : { email: formData.email, password: formData.password };

// //     try {
// //       const response = await fetch(endpoint, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });
// //       if (!response.ok) throw new Error("Failed to authenticate");

// //       const data = await response.json();
// //       if (data.message.includes("successful")) {
// //         navigate("/");
// //       } else {
// //         alert(data.message);
// //       }
// //     } catch (err) {
// //       alert("Error: " + err.message);
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <button className="back-arrow" onClick={() => navigate("/")}>
// //         ← Back
// //       </button>
// //       <div className="toggle-buttons">
// //         <button
// //           className={`toggle-button ${isSignUp ? "active" : ""}`}
// //           onClick={() => setIsSignUp(true)}
// //         >
// //           Sign Up
// //         </button>
// //         <button
// //           className={`toggle-button ${!isSignUp ? "active" : ""}`}
// //           onClick={() => setIsSignUp(false)}
// //         >
// //           Log In
// //         </button>
// //       </div>
// //       <div className="form-container">
// //         <form onSubmit={handleSubmit}>
// //           {isSignUp && (
// //             <>
// //               <input
// //                 type="text"
// //                 name="firstName"
// //                 placeholder="First Name"
// //                 value={formData.firstName}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 name="lastName"
// //                 placeholder="Last Name"
// //                 value={formData.lastName}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </>
// //           )}
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //           <button type="submit">{isSignUp ? "Register" : "Login"}</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUpLoginPage;

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/SignUpLoginPage.css";

// // const SignUpLoginPage = () => {
// //   const navigate = useNavigate();
// //   const [isSignUp, setIsSignUp] = useState(true);
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const endpoint = isSignUp ? "/api/signup" : "/api/login";
// //     const body = isSignUp
// //       ? formData
// //       : { email: formData.email, password: formData.password };

// //     try {
// //       const response = await fetch(endpoint, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message);
// //       }

// //       const data = await response.json();
// //       if (data.message.includes("successful")) {
// //         navigate("/");
// //       } else {
// //         alert(data.message);
// //       }
// //     } catch (err) {
// //       alert("Error: " + err.message);
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <button className="back-arrow" onClick={() => navigate("/")}>
// //         ← Back
// //       </button>
// //       <div className="toggle-buttons">
// //         <button
// //           className={`toggle-button ${isSignUp ? "active" : ""}`}
// //           onClick={() => setIsSignUp(true)}
// //         >
// //           Sign Up
// //         </button>
// //         <button
// //           className={`toggle-button ${!isSignUp ? "active" : ""}`}
// //           onClick={() => setIsSignUp(false)}
// //         >
// //           Log In
// //         </button>
// //       </div>
// //       <div className="form-container">
// //         <form onSubmit={handleSubmit}>
// //           {isSignUp && (
// //             <>
// //               <input
// //                 type="text"
// //                 name="firstName"
// //                 placeholder="First Name"
// //                 value={formData.firstName}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 name="lastName"
// //                 placeholder="Last Name"
// //                 value={formData.lastName}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </>
// //           )}
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //           <button type="submit">{isSignUp ? "Register" : "Login"}</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUpLoginPage;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import "../styles/SignUpLoginPage.css";

// // const SignUpLoginPage = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   // Determine initial form type from location state
// //   const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp ?? true);

// //   // Store user data for the form
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //   });

// //   // Prefill email and password after successful signup
// //   const [prefilledLoginData, setPrefilledLoginData] = useState(null);

// //   useEffect(() => {
// //     if (!isSignUp && prefilledLoginData) {
// //       setFormData(prefilledLoginData);
// //     }
// //   }, [isSignUp, prefilledLoginData]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const endpoint = isSignUp ? "/api/signup" : "/api/login";
// //     const body = isSignUp
// //       ? formData
// //       : { email: formData.email, password: formData.password };
  
// //     try {
// //       const response = await fetch(endpoint, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //         credentials: "include", // Include credentials for cookie-based auth
// //       });
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message);
// //       }
  
// //       const data = await response.json();
// //       if (isSignUp) {
// //         setIsSignUp(false);
// //         setPrefilledLoginData({
// //           email: formData.email,
// //           password: formData.password,
// //         });
// //         alert("Sign up successful! Please log in.");
// //       } else if (data.message.includes("successful")) {
// //         navigate("/mood-selection"); // Navigate to mood-selection
// //       }
// //     } catch (err) {
// //       alert("Error: " + err.message);
// //     }
// //   };
  
  

// //   return (
// //     <div className="auth-container">
// //       <button className="back-arrow" onClick={() => navigate("/")}>
// //         ← Back
// //       </button>
// //       <div className="toggle-buttons">
// //         <button
// //           className={`toggle-button ${isSignUp ? "active" : ""}`}
// //           onClick={() => setIsSignUp(true)}
// //         >
// //           Sign Up
// //         </button>
// //         <button
// //           className={`toggle-button ${!isSignUp ? "active" : ""}`}
// //           onClick={() => setIsSignUp(false)}
// //         >
// //           Log In
// //         </button>
// //       </div>
// //       <div className="form-container">
// //         <form onSubmit={handleSubmit}>
// //           {isSignUp && (
// //             <>
// //               <input
// //                 type="text"
// //                 name="firstName"
// //                 placeholder="First Name"
// //                 value={formData.firstName}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 name="lastName"
// //                 placeholder="Last Name"
// //                 value={formData.lastName}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </>
// //           )}
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //           <button type="submit">{isSignUp ? "Register" : "Login"}</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUpLoginPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../styles/SignUpLoginPage.css";

// const SignUpLoginPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Determine initial form type from location state
//   const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp ?? true);

//   // Store user data for the form
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   // Prefill email and password after successful signup
//   const [prefilledLoginData, setPrefilledLoginData] = useState(null);

//   useEffect(() => {
//     if (!isSignUp && prefilledLoginData) {
//       setFormData(prefilledLoginData);
//     }
//   }, [isSignUp, prefilledLoginData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = isSignUp ? "/api/signup" : "/api/login";
//     const body = isSignUp
//       ? formData
//       : { email: formData.email, password: formData.password };

//     try {
//       console.log("Sending request to:", endpoint, "with body:", body);
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//         credentials: "include", // Include credentials for cookie-based auth
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Server error:", errorData);
//         throw new Error(errorData.message || "Failed to process request");
//       }

//       const data = await response.json();
//       console.log("Server response:", data);

//       if (isSignUp) {
//         setIsSignUp(false);
//         setPrefilledLoginData({
//           email: formData.email,
//           password: formData.password,
//         });
//         alert("Sign up successful! Please log in.");
//       } else if (data.message && data.message.includes("successful")) {
//         console.log("Login successful, navigating to mood-selection");
//         navigate("/mood-selection"); // Navigate to mood-selection
//       } else {
//         throw new Error("Unexpected response from server");
//       }
//     } catch (err) {
//       console.error("Error:", err.message);
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <button className="back-arrow" onClick={() => navigate("/")}>
//         ← Back
//       </button>
//       <div className="toggle-buttons">
//         <button
//           className={`toggle-button ${isSignUp ? "active" : ""}`}
//           onClick={() => setIsSignUp(true)}
//         >
//           Sign Up
//         </button>
//         <button
//           className={`toggle-button ${!isSignUp ? "active" : ""}`}
//           onClick={() => setIsSignUp(false)}
//         >
//           Log In
//         </button>
//       </div>
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           {isSignUp && (
//             <>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </>
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">{isSignUp ? "Register" : "Login"}</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpLoginPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/SignUpLoginPage.css";

const SignUpLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth(); // Use the auth context

  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp ?? true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [prefilledLoginData, setPrefilledLoginData] = useState(null);

  useEffect(() => {
    if (!isSignUp && prefilledLoginData) {
      setFormData(prefilledLoginData);
    }
  }, [isSignUp, prefilledLoginData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "/api/signup" : "/api/login";
    const body = isSignUp
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process request");
      }

      const data = await response.json();
      console.log("Server response:", data);

      if (isSignUp) {
        setIsSignUp(false);
        setPrefilledLoginData({
          email: formData.email,
          password: formData.password,
        });
        alert("Sign up successful! Please log in.");
      } else if (data.message && data.message.includes("successful")) {
        setAuth({ isAuthenticated: true, user: data.user, loading: false });
        navigate("/mood-selection");
      }
    } catch (err) {
      console.error("Error:", err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-arrow" onClick={() => navigate("/")}>
        ← Back
      </button>
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${isSignUp ? "active" : ""}`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
        <button
          className={`toggle-button ${!isSignUp ? "active" : ""}`}
          onClick={() => setIsSignUp(false)}
        >
          Log In
        </button>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignUp ? "Register" : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpLoginPage;

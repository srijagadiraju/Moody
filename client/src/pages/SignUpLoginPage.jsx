import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SignUpLoginPage.css';

const SignUpLoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialIsSignUp = location.state?.isSignUp ?? true;
    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);

    return (
        <div className="auth-container">
            <button className="back-arrow" onClick={() => navigate('/')}>← Back</button>
            <div className="toggle-buttons">
                <button
                    className={`toggle-button ${isSignUp ? 'active' : ''}`}
                    onClick={() => setIsSignUp(true)}
                >
                    Sign Up
                </button>
                <button
                    className={`toggle-button ${!isSignUp ? 'active' : ''}`}
                    onClick={() => setIsSignUp(false)}
                >
                    Log In
                </button>
            </div>
            <div className="form-container">
                <form>
                    {isSignUp && (
                        <>
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                        </>
                    )}
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">{isSignUp ? 'Register' : 'Login'}</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpLoginPage;


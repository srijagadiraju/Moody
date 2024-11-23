import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; // Add your CSS file here

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Navigation</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/community">Community</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/mood-selection">Mood Selection</Link>
                    </li>
                    <li>
                        <Link to="/logout">Sign Out</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

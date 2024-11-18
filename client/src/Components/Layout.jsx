import React from "react";
import Sidebar from "./Sidebar"; // Sidebar component
import "../styles/Layout.css"; // Optional additional styles for layout

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <main className="content">{children}</main>
        </div>
    );
};

export default Layout;

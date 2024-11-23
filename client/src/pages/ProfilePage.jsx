import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'; // Import the NavBar component
import '../styles/ProfilePage.css'; // Optional CSS file

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    // Fetch user profile on component load
    useEffect(() => {
        axios.get('http://localhost:3001/api/profile', {
            withCredentials: true, // This ensures cookies are sent with the request
        })
        .then((res) => {
            setProfile(res.data);
        })
        .catch((err) => {
            console.error("Error fetching profile:", err);
        });
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <>
            <NavBar />  {/* Include NavBar like in CommunityPage */}
            <div className="profile-page">
                <h1>Profile Page</h1>
                <p><strong>First Name:</strong> {profile.firstName}</p>
                <p><strong>Last Name:</strong> {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
        </>
    );
};

export default ProfilePage;

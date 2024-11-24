import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'; // Import the NavBar component
import '../styles/ProfilePage.css'; // Optional CSS file

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture') || null);
    const [favoriteQuote, setFavoriteQuote] = useState(localStorage.getItem('favoriteQuote') || '');
    const [timezone, setTimezone] = useState(localStorage.getItem('timezone') || '');

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

    // Handle profile picture change
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Save changes to localStorage
    const saveProfilePicture = () => {
        localStorage.setItem('profilePicture', profilePicture);
        alert('Profile picture saved!');
    };

    const saveFavoriteQuote = () => {
        localStorage.setItem('favoriteQuote', favoriteQuote);
        alert('Favorite quote saved!');
    };

    const saveTimezone = () => {
        localStorage.setItem('timezone', timezone);
        alert('Timezone saved!');
    };

    return (
        <>
            <NavBar /> {/* Include NavBar */}
            <div className="profile-page">
                <h1>Profile Page</h1>

                {/* Profile Picture */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {profilePicture && (
                        <img
                            src={profilePicture}
                            alt="Profile"
                            style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }}
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: 'block', margin: '0 auto' }}
                    />
                    <button
                        onClick={saveProfilePicture}
                        style={{
                            fontSize: '12px',
                            padding: '5px 10px',
                            marginTop: '5px',
                        }}
                    >
                        Save
                    </button>
                </div>

                {/* First Name */}
                <p><strong>First Name:</strong> {profile.firstName}</p>

                {/* Last Name */}
                <p><strong>Last Name:</strong> {profile.lastName}</p>

                {/* Email */}
                <p><strong>Email:</strong> {profile.email}</p>

                {/* Favorite Quote */}
                <div>
                    <label>
                        <strong>Favorite Quote:</strong>
                    </label>
                    <textarea
                        value={favoriteQuote}
                        onChange={(e) => setFavoriteQuote(e.target.value)}
                        placeholder="Enter your favorite quote"
                        rows="3"
                        style={{ width: '100%' }}
                    />
                    <button
                        onClick={saveFavoriteQuote}
                        style={{
                            fontSize: '12px',
                            padding: '5px 5px',
                            marginTop: '0px',  // Reduced space between the quote field and button
                        }}
                    >
                        Save
                    </button>
                </div>

                {/* Timezone */}
                <div>
                    <label>
                        <strong>Timezone:</strong>
                    </label>
                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        style={{ marginTop: '15px' }}  // Increased space between the Save button and Timezone field
                    >
                        <option value="">Select your timezone</option>
                        <option value="UTC-12:00">UTC-12:00</option>
                        <option value="UTC-11:00">UTC-11:00</option>
                        <option value="UTC-10:00">UTC-10:00</option>
                        <option value="UTC-09:00">UTC-09:00</option>
                        <option value="UTC-08:00">UTC-08:00</option>
                        <option value="UTC-07:00">UTC-07:00</option>
                        <option value="UTC-06:00">UTC-06:00</option>
                        <option value="UTC-05:00">UTC-05:00</option>
                        <option value="UTC-04:00">UTC-04:00</option>
                        <option value="UTC-03:00">UTC-03:00</option>
                        <option value="UTC-02:00">UTC-02:00</option>
                        <option value="UTC-01:00">UTC-01:00</option>
                        <option value="UTC+00:00">UTC+00:00</option>
                        <option value="UTC+01:00">UTC+01:00</option>
                        <option value="UTC+02:00">UTC+02:00</option>
                        <option value="UTC+03:00">UTC+03:00</option>
                        <option value="UTC+04:00">UTC+04:00</option>
                        <option value="UTC+05:00">UTC+05:00</option>
                        <option value="UTC+06:00">UTC+06:00</option>
                        <option value="UTC+07:00">UTC+07:00</option>
                        <option value="UTC+08:00">UTC+08:00</option>
                        <option value="UTC+09:00">UTC+09:00</option>
                        <option value="UTC+10:00">UTC+10:00</option>
                        <option value="UTC+11:00">UTC+11:00</option>
                        <option value="UTC+12:00">UTC+12:00</option>
                    </select>
                    <button
                        onClick={saveTimezone}
                        style={{
                            fontSize: '12px',
                            padding: '5px 10px',
                            marginTop: '10px',
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;

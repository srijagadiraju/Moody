import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css'; // Optional CSS file

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        theme: '',
        notifications: false,
        timeZone: '',
        badges: []
    });

    // Fetch user profile on component load
    useEffect(() => {
        axios.get('http://localhost:3001/api/profile')
            .then((res) => {
                setProfile(res.data);
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    theme: res.data.preferences.theme,
                    notifications: res.data.preferences.notifications,
                    timeZone: res.data.preferences.timeZone,
                    badges: res.data.preferences.badges
                });
            })
            .catch((err) => console.error(err));
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Submit updated profile
    const handleFormSubmit = () => {
        axios.put('/api/profile', formData)
            .then((res) => {
                setProfile(res.data);
                setIsEditing(false);
            })
            .catch((err) => console.error(err));
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <img src={profile.avatar} alt="Profile" className="profile-avatar" />
            {!isEditing ? (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Theme:</strong> {profile.preferences.theme}</p>
                    <p><strong>Notifications:</strong> {profile.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
                    <p><strong>Time Zone:</strong> {profile.preferences.timeZone}</p>
                    <p><strong>Badges:</strong> {profile.preferences.badges.join(', ')}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </label>
                    <label>
                        Theme:
                        <select name="theme" value={formData.theme} onChange={handleInputChange}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>
                    <label>
                        Notifications:
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={formData.notifications}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Time Zone:
                        <input type="text" name="timeZone" value={formData.timeZone} onChange={handleInputChange} />
                    </label>
                    <label>
                        Badges:
                        <input
                            type="text"
                            name="badges"
                            value={formData.badges.join(', ')}
                            onChange={(e) => handleInputChange({
                                target: {
                                    name: 'badges',
                                    value: e.target.value.split(',').map((badge) => badge.trim())
                                }
                            })}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;

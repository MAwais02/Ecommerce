import React, { useState } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Import the updated CSS file

const UserProfile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(user.avatar.url);

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Prepare the data to be sent
        const updatedData = {
            name,
            email,
            avatar: {
                public_id: user.avatar.public_id,
                url: avatar,
            },
        };

        try {
            const response = await axios.put('http://localhost:4000/api/v1/update-profile', updatedData);
            console.log("Profile updated successfully:", response.data);
            setIsEditing(false); // Exit edit mode after successful update
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="profileContainer">
            <div className="profileCard">
                <div className="profileAvatarSection">
                    <img src={avatar} alt="Avatar" className="avatar" />
                </div>
                <div className="profileInfoSection">
                    <h1>{name}'s Profile</h1>
                    <p>Email: {email}</p>
                    <a onClick={() => setIsEditing(true)} className="update-button">Update Information</a>
                </div>
            </div>

            {isEditing && (
                <form onSubmit={handleUpdate} className="update-profile-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">Avatar URL:</label>
                        <input
                            type="url"
                            id="avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="form-input"
                        />
                        <img src={avatar} alt="Avatar Preview" className="avatar-preview" />
                    </div>
                    <button type="submit" className="save-button">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default UserProfile;

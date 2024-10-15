import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";
import Sidebar from "./sidebar";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/admin/users", { withCredentials: true });
                if (response.data.success) {
                    console.log(response.data.success);
                    setUsers(response.data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <div>
                <Sidebar />
            </div>
            <div className="main-content">
                <h2 className="title">User Information</h2>
                <div className="user-table">
                    <div className="table-header">
                        <div className="header-item">Avatar</div>
                        <div className="header-item">Name</div>
                        <div className="header-item">Email</div>
                        <div className="header-item">Role</div>
                    </div>
                    {users.map((user) => (
                        <div className="table-row" key={user._id}>
                            <div className="row-item">
                                <img
                                    src={user.avatar?.url || "https://via.placeholder.com/40"}
                                    alt={user.name}
                                    className="avatar"
                                />
                            </div>
                            <div className="row-item">{user.name}</div>
                            <div className="row-item">{user.email}</div>
                            <div className="row-item">{user.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;

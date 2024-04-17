import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordChange = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const { rgnum } = useParams(); // Extract rgnum from URL params

    useEffect(() => {
        // Log the rgnum to verify if it's correctly extracted
        console.log('rgnum:', rgnum);
    }, [rgnum]); // Run this effect whenever rgnum changes

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            // Update confirm password value to new password
            setConfirmPassword(value);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            if (newPassword !== confirmPassword) {
                setError('New password and confirm password do not match');
                return;
            }

            const res = await axios.post(`http://localhost:4000/changepassword/${rgnum}`, {
                newPassword,
                confirmPassword: newPassword // Use newPassword for confirmPassword
            });

            console.log(res.data);
            if (res.status === 200) {
                console.log('Password changed successfully');
                window.location.href = '/studentlogin';
                // Optionally, you may handle redirection or any other action here
            }
        } catch (error) {
            console.error('Password change failed:', error.response.data.error);
            setError('Internal server error');
        }
    };

    return (
        <div className="container">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3>Reset Password</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label>New Password</label>
                            <input
                                className="form-control"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Confirm Password</label>
                            <input
                                className="form-control"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button className="btn btn-success" onClick={handlePasswordChange}>
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordChange;

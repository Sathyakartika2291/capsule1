import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StudentDash extends Component {
    render() {
        // Retrieve registration number from session storage
        const rgnum = sessionStorage.getItem('rgnum');

        return (
            <div className="container">
                <header className="bg-dark text-light text-center py-4">
                    <h1>Student Dashboard</h1>
                </header>
                <nav className="bg-secondary text-light py-2">
                    <div className="container">
                        <div className="row">
                            {/* Pass registration number as a parameter to the update profile route */}
                            <Link to={`/updateprofile/${rgnum}`}>
                                <h2 className="mb-3">Update Profile</h2>
                            </Link>
                            <Link to={`/resetstupwd/${rgnum}`}>
                                <h2 className="mb-3">Reset Password</h2>
                            </Link>
                            <Link to="/downloadhallticket">
                                <h2 className="mb-3">Download HallTicket</h2>
                            </Link>
                            <Link to={`/leaveform/${rgnum}`}>
                                <h2 className="mb-3">Leave Form</h2>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default StudentDash;

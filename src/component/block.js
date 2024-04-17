import React, { useState } from 'react';
import axios from 'axios';

const AdminConsole = () => {
    const [status, setStatus] = useState('active');
    const [rgnum, setRgnum] = useState('');

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:4000/block/${rgnum}`, { status });
            console.log(res.data);
            // Redirect to next page upon successful update
            if (res.status === 200) {
                console.log('Status updated successfully');
                sessionStorage.setItem('rgnum', rgnum);
                // Optionally, you may handle redirection or any other action here
            }
        } catch (error) {
            console.error('Update failed:', error.response.data.message);
            // Handle update failure (display error message, clear input fields, etc.)
        }
    };

    return (
        <div className="container">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3>Block Account</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label>Register Number</label>
                            <input
                                className="form-control"
                                value={rgnum}
                                onChange={(e) => setRgnum(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={handleUpdateStatus}>Update Status</button>
                </div>
            </div>
        </div>
    );
};

export default AdminConsole;

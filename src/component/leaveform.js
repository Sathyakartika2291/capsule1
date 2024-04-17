import React, { useState } from 'react';

const LeaveApplyForm = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    // Function to handle form submission
    const handleSubmit = async() => {
        try {
            const response = await fetch(`http://localhost:4000/leaveform/${formData.rgnum}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Profile updated successfully');
            } else {
                console.error('Profile update failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <div className="leave-form">
                        <h3>Leave Application Form</h3>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group col-md-12">
                                <label>Name:</label>
                                <input className="form-control"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Start Date:</label>
                                <input className="form-control"
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label>End Date:</label>
                                <input className="form-control"
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Reason:</label>
                                <textarea className="form-control"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button className="btn btn-success" type="submit">Submit</button>
                        </form>
                    </div>
                    </div>
                    </div>
                    </div>
                    );
};

                    export default LeaveApplyForm;

import React, { useState, useEffect } from 'react';

const base_url = "http://localhost:4000/leaveapproval";

const LeaveApprovalTable = () => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        fetch(base_url)
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleApprove = (index) => {
        // Logic to handle leave approval for the item at index
        console.log(`Leave approved for index ${index}`);
        // Show approval message
        alert('Leave approved');
    };

    const renderTableRows = () => {
        if (formData && formData.length > 0) {
            return formData.map((dataItem, index) => (
                <tr key={index}>
                    <td>{dataItem.name}</td>
                    <td>{dataItem.startDate}</td>
                    <td>{dataItem.endDate}</td>
                    <td>{dataItem.reason}</td>
                    <td>
                        <button className='btn-success' onClick={() => handleApprove(index)}>Approve</button>
                    </td>
                </tr>
            ));
        } else {
            return (
                <tr>
                    <td colSpan="5">No data available</td>
                </tr>
            );
        }
    };

    return (
        <div className="container">
            <h2>Leave Approval Table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveApprovalTable;

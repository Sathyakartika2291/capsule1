import React, { useState } from 'react';
import axios from 'axios';

const StudentHallTicketPage = () => {
    const [hallTicket, setHallTicket] = useState(null);
    const [rgnum, setRgnum] = useState('');
    const [error, setError] = useState(null);

    const fetchHallTicket = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/downloadhallticket/${rgnum}`);
            setHallTicket(response.data);
            setError(null); // Reset error state if request succeeds
        } catch (error) {
            console.error('Error fetching hall ticket:', error);
            setError('Error fetching hall ticket. Please try again.'); // Set error message
            setHallTicket(null); // Reset hall ticket data
        }
    };

    const handleDownload = async () => {
        try {
            // Implement download functionality here
            // For example, you can use FileSaver.js
            // Example:
            // const response = await axios.get(`http://localhost:4000/downloadhallticket/${rgnum}/download`, {
            //   responseType: 'blob' // Tell Axios to expect a binary response
            // });
            // const blob = new Blob([response.data], { type: 'application/pdf' });
            // saveAs(blob, 'hallticket.pdf');
        } catch (error) {
            console.error('Error downloading hall ticket:', error);
            setError('Error downloading hall ticket. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3>Hall Ticket</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="form-group col-md-12">

                            <input
                                type="text"
                                value={rgnum}
                                onChange={(e) => setRgnum(e.target.value)}
                                placeholder="Enter Student Registration number"
                            />
                        </div>
                        <div className="form-group col-md-12">

                            <button onClick={fetchHallTicket}>Fetch Hall Ticket</button>
                        </div>
                        {error && <p>{error}</p>}
                        {hallTicket && (
                            <div>
                                <p>Student Name: {hallTicket.studentName}</p>
                                <p>Exam Date: {hallTicket.examDate}</p>
                                <p>Exam Time: {hallTicket.examTime}</p>
                                <button className="btn btn-success" onClick={handleDownload}>Download Hall Ticket</button>
                            </div>
                        )}
                    </div>
                    </div>
                    </div>
                    </div>
                    );
};

                    export default StudentHallTicketPage;

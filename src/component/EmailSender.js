// EmailSender.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const base_url = "http://localhost:4000/updateprofile";

const EmailSender = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetch(`${base_url}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);
 

    const sendEmails = async () => {
        try {
            await axios.post('/sendemails', { subject, message, students }); 
            alert('Emails sent successfully!');
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    };

    return (
        <div className="container">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3>Email Sender</h3>
                </div>
                </div>
                <form onSubmit={sendEmails}>
                <div className="panel-body">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="subject">Subject:</label>
                            <input className="form-control" type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="message">Message:</label>
                            <textarea className="form-control" id="message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="btn btn-success" type="submit">Send Emails</button>
                    </div>
                </form>
            </div>
            );
};

            export default EmailSender;

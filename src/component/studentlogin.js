import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [rgnum, setRgnum] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/studentlogin', { rgnum, password });
            console.log(res.data);
            // Redirect to next page upon successful login
            if (res.status === 200) {
                console.log('Login successful');
                // Save registration number in session storage
                sessionStorage.setItem('rgnum', rgnum);
                window.location.href = '/studentdash';
            }
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
            // Handle login failure (display error message, clear input fields, etc.)
        }
    };

    return (
        <div className="container">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3>Student Login</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group col-md-12">
                                <label>Register Number:</label>
                                <input className="form-control" value={rgnum} onChange={(e) => setRgnum(e.target.value)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Password:</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-success">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/login', { email, password });
            console.log(res.data);
            // Redirect to next page upon successful login
            if (res.status === 200) {
                console.log('Login successful');
                window.location.href = '/admin';
                 // Clear input fields
                 setEmail('');
                 setPassword('');
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
                    <h3>Admin Login </h3>
                </div>
                <div className="panel-body">
                    <div className="row">

                        <form onSubmit={handleSubmit}>
                            <div className="form-group col-md-12">
                                <label>Email:</label>


                                <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}  autoComplete="off"/>
                            </div>
                            <div className="form-group col-md-12">
                                <label>Password:</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}  autoComplete="off"/>
                            </div>
                            <button type="submit" className="btn btn-success">Login</button>
                        </form>
                        <Link to="/signup">
                               SignUp
                                </Link>
                    </div>
                </div>
                </div>
                </div>
                );
};

                export default Login;

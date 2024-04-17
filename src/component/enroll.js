import React, { Component } from 'react';

class Enroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rgnum: '',
            name: '',
            email: '',
            password: '',
            phone: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckout = async () => {
        try {
            const {rgnum, name, email, password ,phone} = this.state;
    
            // Send registration data to backend server
            const response = await fetch('http://localhost:4000/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({rgnum, name, email, password,phone })
            });
    
            if (response.ok) {
                console.log('Registration successful');
                // Redirect to login page or any other page
                window.location.href = '/studentlogin';
            } else {
                console.error('Registration failed:', response.statusText);
                // Optionally, you can handle errors and display an error message to the user
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Optionally, you can handle errors and display an error message to the user
        }
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3>Student Enroll</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label>Register Number</label>
                                <input className="form-control" name="rgnum"
                                    value={this.state.rgnum} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Name</label>
                                <input className="form-control" name="name"
                                    value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Email</label>
                                <input className="form-control" name="email"
                                    value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password"
                                    value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Phone</label>
                                <input className="form-control" name="phone"
                                    value={this.state.phone} onChange={this.handleChange} />
                            </div>
                        </div>
                        <button className="btn btn-success" onClick={this.handleCheckout}>Enroll</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Enroll;

import React, { useState, useEffect } from 'react';

const Updateprofile = ({ match }) => {
    const [formData, setFormData] = useState({
        rgnum: '',
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/updateprofile/${match.params.rgnum}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setFormData({
                    rgnum: userData.rgnum,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [match.params.rgnum]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {
        try {
            const { rgnum, name, email, password, phone } = formData;

            const response = await fetch('http://localhost:4000/updateprofile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rgnum, name, email, password, phone })
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

    return (
        <div className="container">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3>Update Profile</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label>Register Number</label>
                            <input className="form-control" name="rgnum"
                                value={formData.rgnum} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Name</label>
                            <input className="form-control" name="name"
                                value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Email</label>
                            <input className="form-control" name="email"
                                value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"
                                value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Phone</label>
                            <input className="form-control" name="phone"
                                value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={handleCheckout}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Updateprofile;

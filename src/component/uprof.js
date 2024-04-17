import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const base_url = "http://localhost:4000/updateprofile";

const Uprof = () => {
    const params = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        fetch(`${base_url}/${params.rgnum}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [params.rgnum]);

    const renderUpdate = () => {
        if (formData) {
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
                                    <input className="form-control" name="rgnum" value={formData.rgnum}  onChange={(e) => setFormData({ ...formData, rgnum: e.target.value })} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Name</label>
                                    <input className="form-control" name="name" value={formData.name}  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Email</label>
                                    <input className="form-control" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}  />
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Phone</label>
                                    <input className="form-control" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={handleCheckout}>Update Profile</button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch('http://localhost:4000/updateprofile', {
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

    return (
        <>
            <div>
                {renderUpdate()}
            </div>
        </>
    );
};

export default Uprof;

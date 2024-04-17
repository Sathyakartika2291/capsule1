import React,{Component} from 'react';
class Signup extends Component{

    constructor(props){
        super(props)

        this.state={
            name:'',
            email:'',
            password:''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    handleCheckout = async () => {
        try {
            const { name, email, password } = this.state;
    
            // Send registration data to backend server
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
    
            if (response.ok) {
                console.log('Registration successful');
                // Redirect to login page or any other page
                window.location.href = '/login';
            } else {
                console.error('Registration failed:', response.statusText);
                // Optionally, you can handle errors and display an error message to the user
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Optionally, you can handle errors and display an error message to the user
        }
    }
    

    render(){
        return(
           <div className="container">
               <div className="panel panel-success">
                   <div className="panel-heading">
                    <h3>Admin Signup </h3>
                   </div>
                   <div className="panel-body">
                           <div className="row">
                                 <div className="form-group col-md-12">
                                    <label>Name</label>
                                    <input className="form-control" name="name"
                                    value={this.state.name} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Email</label>
                                    <input className="form-control" name="email"
                                    value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                 <div className="form-group col-md-12">
                                    <label>Password</label>
                                    <input className="form-control" name="password"
                                    value={this.state.password} onChange={this.handleChange}/>
                                </div>
                               
                           </div>
                           <button className="btn btn-success" onClick={this.handleCheckout} >Register</button>
                   </div>
               </div>
            </div>
        )
    }
}

export default Signup;


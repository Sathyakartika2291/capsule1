import React,{Component} from 'react';

import {Link} from 'react-router-dom'
class Home extends Component{
    constructor(props){
        super(props)

        this.state={
           
        }
    }
    render()
{
    return(
       <div className="container">
                           
                                <Link to="/login">
                                <h2 class="mb-3">Admin Login</h2>
                                </Link>
                           
                                <Link to="/studentlogin">
                                <h2 class="mb-3">Student Login</h2>   
                                </Link>
                                 </div>
    )
}
}
export default Home;
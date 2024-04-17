import React,{Component} from 'react';

import {Link} from 'react-router-dom'
class Admin extends Component{
    constructor(props){
        super(props)

        this.state={
           
        }
    }
render()
{
    return(
       <div className="container">
<header class="bg-dark text-light text-center py-4">
        <h1>Admin Dashboard</h1>
    </header>
    <nav class="bg-secondary text-light py-2">
        <div class="container">
            <div class="row">
                                <Link to="/enroll">
                                <h2 class="mb-3">Enroll Student</h2> 
                                </Link>
                                <Link to="/email">
                                <h2 class="mb-3">Send Email</h2>
                                </Link>
                                <Link to="/block">
                                <h2 class="mb-3">Block Account</h2> 
                                </Link>
                               <Link to="/leaveapprove">
                                <h2 class="mb-3">Leave Form Approval</h2> 
                                </Link>
                            
            </div>
        </div>
    </nav>
 

       </div>
        )
    }
}
export default Admin;
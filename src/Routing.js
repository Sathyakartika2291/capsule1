import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './component/login';
import Enroll from './component/enroll';
import Signup from './component/signup';
import Admin from './component/admin';
import Home from './component/home';
import Studentlogin from './component/studentlogin';
import EmailSender from './component/EmailSender';
import StudentDash from './component/studentdash';
import Uprof from './component/uprof';
import Passwordchange from './component/passwordchange';
import LeaveApplyForm from './component/leaveform';
import LeaveApprovalTable from './component/approveleave';
import AdminConsole from './component/block';
import StudentHallTicketPage from './component/downloadhallticket';

const Routing = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/enroll" component={Enroll}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/studentlogin" component={Studentlogin}/>
            <Route exact path="/email" component={EmailSender}/>
            <Route exact path="/studentdash" component={StudentDash}/>
            <Route exact path="/updateprofile/:rgnum" component={Uprof}/>
            <Route exact path="/resetstupwd/:rgnum" component={Passwordchange}/>
            <Route exact path="/leaveform/:rgnum" component={LeaveApplyForm}/>
            <Route exact path="/leaveapprove" component={LeaveApprovalTable}/>
            <Route exact path="/block" component={AdminConsole}/>
            <Route exact path="/downloadhallticket" component={StudentHallTicketPage}/> 
            <Footer/>
        </BrowserRouter>
    )
}


export default Routing
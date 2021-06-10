import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import './css/app.css';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from "./actions/authActions";
import AppsList from "./components/appComponents/app-list.component";
import {connect,SearchForm} from './components/searchbarComponents/main.component';
import store from "./store";
import Register from "./components/authComponents/register.component";
import Login from "./components/authComponents/login.component";
import ContactUs from "./components/authComponents/contact-us.component";
import PrivateRoute from './components/authComponents/privateRoute.component';
import Nehalim from './components/nehalimComponents/main.component';
import PasswordList from './components/passwordsComponents/main.component';
import FileUpload from './components/nehalimComponents/file-upload.component';
import MyAccount from './components/appComponents/my-account.component';
import BackupsList from './components/backupsComponents/main.component';
import EditBackup from './components/backupsComponents/add-backup.component';
import ShiftsList from './components/shiftsComponents/main.component';
import ActivityList from './components/activitiesComponents/main.component';
import {isAdmin} from './utils/rolesCheck.js';


//Import Components related to the Journal
import EventsList from "./components/eventsComponents/main.component";
import EditEvents from "./components/eventsComponents/edit-events.component";
//Import Components related to the Journal
import SwitchoversList from "./components/switchoverComponents/main.component";
import EditSwitchovers from "./components/switchoverComponents/edit-switchover.component";
//Import Components related to the SVM
import SvmSite from "./components/svmComponents/svm-site.component";
import AddSVM from "./components/svmComponents/add-svm.component";
//Import Components related to the Phone
import PhoneList from "./components/phoneComponents/main.component";
//Import Components related to the Phone
import NiturList from "./components/niturComponents/main.component";
//Import Components related to the Tasks
import TasksList from "./components/tasksComponents/tasks-list.component";
import EditTask from "./components/tasksComponents/edit-task.component";
//Import Components related to the MMS
import MMS from "./components/mmsComponents/mms.component";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in miliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App" >
                        <Route exact path="/" component={Login} />
                        <Route exact path="/contact-us" component={ContactUs} />
                        <Switch>    
                            <PrivateRoute exact path="/register" component={Register} />
                            <PrivateRoute exact path="/TeamSite/backups" component={BackupsList} />
                            <PrivateRoute exact path="/edit/:id" component={EditBackup} />
                            <PrivateRoute path="/TeamSite" exact component={SearchForm} />   
                            <PrivateRoute path="/TeamSite/apps" exact component={AppsList} />  
                            <PrivateRoute path="/TeamSite/nehalim" exact component={Nehalim} />   
                            <PrivateRoute path="/TeamSite/events" exact component={EventsList} />
                            <PrivateRoute path="/edit/:id" component={EditEvents} /> 
                            <PrivateRoute path="/TeamSite/tasks" exact component={TasksList} />
                            <PrivateRoute path="/edit/:id" component={EditTask} /> 
                            <PrivateRoute path="/TeamSite/switchovers" exact component={SwitchoversList} />
                            <PrivateRoute path="/edit2/:id" component={EditSwitchovers} />
                            <PrivateRoute path="/TeamSite/svm" exact component={SvmSite} />
                            <PrivateRoute path="/TeamSite/svmlists" component={AddSVM} /> 
                            <PrivateRoute path="/TeamSite/phones" exact component={PhoneList} />
                            <PrivateRoute path="/TeamSite/niturs" exact component={NiturList} />
                            <PrivateRoute path="/TeamSite/mms" exact component={MMS} />
                            <PrivateRoute path="/TeamSite/passwords" exact component={PasswordList} />
                            <PrivateRoute path="/TeamSite/upload" exact component={FileUpload} /> 
                            <PrivateRoute path="/TeamSite/myaccount" exact component={MyAccount} />
                            <PrivateRoute path="/TeamSite/activities" exact component={ActivityList} />
                            <PrivateRoute path="/TeamSite/shifts" exact component={ShiftsList} />                     
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;
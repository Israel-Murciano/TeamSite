import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, } from "./types";
import { node_host, node_port } from '../config';
import UploadAlert from '../components/nehalimComponents/uploadAlert.component';
import "@fortawesome/fontawesome-free/css/all.min.css";


// Register User 
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("http://" + node_host + ":" + node_port + "/api/users/register", userData)
        .then(res => alert('Registered!'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Email User 
export const emailUser = (userData, history) => dispatch => {
    axios
        .post("http://" + node_host + ":" + node_port + "/api/users/emailUser", userData)
        .then(res => {if(window.confirm('Thanks, we will get back to you soon!')) {history.push("/")}}) //redirect to a thank you page on successful submitting
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("http://" + node_host + ":" + node_port + "/api/users/login", userData)
        .then(res => {
         // Save to localStorage


            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            console.log("DECODED: " + decoded.role);
            // Set current user
            dispatch(setCurrentUser(decoded));
            console.log(token);
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    
    setAuthToken(false);
    console.log(setAuthToken);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    window.location.href = "/";
};

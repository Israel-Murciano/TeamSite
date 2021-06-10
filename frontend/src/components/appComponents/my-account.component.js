import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import jwt_decode from "jwt-decode";
import Logo from "../../images/golden.jpg";
import { AwesomeButtonProgress } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-rickiest.css";
import { element } from "prop-types";


class MyAccount extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      role: ""
    };
  }
  Name() {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      // Decode token and get user info
      const decoded = jwt_decode(token);
      this.state.username = decoded.username;
      this.state.role = decoded.role;
    }
  }

  render() {
    {this.Name()}
    return (
      <div>
        <h1 style={{ paddingTop: "50px", paddingBottom: "20px"}}>
        <i className="fas fa-user mr-3 blue-text" aria-hidden="true"/>
          My Account
        </h1>
        <div style={{paddingBottom: '50px'}}>
        <img src={Logo} className="img-fluid z-depth-5 rounded-circle"/>
        </div>
        <AwesomeButtonProgress style={{marginRight:'90px'}} type="secondary" size="large" loadingLabel="Wait for it..." releaseDelay={1000} resultLabel={this.state.username} action={(element, next) => {
          setTimeout(() =>{
            next();
          }, 200);
        }}>Who am I?</AwesomeButtonProgress>
        <AwesomeButtonProgress style={{marginLeft:'90px'}} type="secondary" size="large" loadingLabel="Wait for it..." releaseDelay={1000} resultLabel={this.state.role} action={(element, next) => {
          setTimeout(() =>{
            next();
          }, 200);
        }}>My role</AwesomeButtonProgress>
        
      </div>
    );
  }
}

export default MyAccount;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "../../css/logincss.css";
import Logo from "../../images/works.png";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-rickiest.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // if logged in and user navigates to Register page, should redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/TeamSite");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/TeamSite"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <img src={Logo} className="center" />
        </div>
        <div style={{ paddingTop: 25, paddingBottom: 25 }}>
          <h1>Login</h1>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-group mb-3 width">
            <div className="input-group-prepend ">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ backgroundColor: "#b3e5e1" }}
              >
                <i className="fa fa-user iconCenter" />
              </span>
            </div>
            <input
              name=""
              id="username"
              type="text"
              className="form-control "
              placeholder="Username"
              aria-describedby="basic-addon1"
              onChange={this.onChange}
              value={this.state.username}
              error={errors.username}
              style={{backgroundColor: '#fafafa', borderColor: '#b3e5e1', boxSizing: 'border-box', borderWidth: '2px', borderStyle: 'solid'}}
            />
          </div>
          <span className="red-text error">
            {errors.username}
            {errors.usernamenotfound}
          </span>

          <div className="input-group mb-3 width">
            <div className="input-group-prepend ">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ backgroundColor: "#b3e5e1" }}
              >
                <i className="fa fa-key iconCenter" />
              </span>
            </div>
            <input
              type="password"
              className="form-control "
              placeholder="Password"
              aria-describedby="basic-addon1"
              id="password"
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              style={{backgroundColor: '#fafafa', borderColor: '#b3e5e1', boxSizing: 'border-box', borderWidth: '2px', borderStyle: 'solid'}}
            />
          </div>
          <span className="red-text error">
            {errors.password}
            {errors.passwordincorrect}
          </span>
          <div>
            <AwesomeButton
              type="secondary"
              href="/contact-us"
              style={{ marginRight: "125px" }}
            >
              {" "}Don't have an account?{" "}
            </AwesomeButton>
            <AwesomeButton type="primary" size="large" value="Login">
              Log in
            </AwesomeButton>
          </div>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);

/*
    <div className="login_picture">
            <div className="container">
                <div className="inner-body">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In</h3>
                            </div>
                            <div className="card-body">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-user"></i></span>
                                        </div>
                                        <div>
                                            <input type="text" name="" className="form-control" placeholder="username"
                                                onChange={this.onChange}
                                                value={this.state.username}
                                                error={errors.username}
                                                id="username"
                                                type="username" 
                                                className={classnames("form-control", {
                                                        invalid: errors.username || errors.usernamenotfound
                                                    })} 
                                            />
                                        </div>
                                        <span className="red-text">
                                                {errors.username}
                                                {errors.usernamenotfound}
                                        </span>
                                    </div>
                                            
                                    
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-key"></i></span>
                                        </div>
                                        <div>
                                            <input type="password" name="" className="form-control" placeholder="password"
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type="password"
                                                className={classnames("form-control", {
                                                    invalid: errors.password || errors.passwordincorrect
                                                })} 
                                            />
                                        </div>
                                        {<span className="red-text">
                                            {errors.password}
                                            {errors.passwordincorrect}
                                        </span>}
                                    </div>

                                    <div className="row align-items- center remember">
                                        <input type="checkbox" /> Remember Me 
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Login" className="btn float-right login_btn"/> 
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                    Don't have an account? <a href="/contact-us"> Sign Up </a>
                                </div>

                                <div className="d-flex justify-content-center">
                                <a href="/delete"> Forget Your Password? </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>

        */

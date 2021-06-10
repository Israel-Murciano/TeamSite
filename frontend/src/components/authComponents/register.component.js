import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "../../css/registercss.css";
import DeleteUser from "./deleteUser.component";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      role: "medium",
      errors: {}
    };
  }

  componentDidMount() {
    // if logged in and user navigates to Register page, should redirect to dashboard
    //if (this.props.auth.isAuthenticated) {
    //  this.props.history.push("/TeamSite");
    //}
  }

  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };
    this.props.registerUser(newUser, this.props.history);
    this.setState({
      username: "",
      password: "",
      password2: "",
      role: ""
    });
    // Refresh the Page
    window.location.reload(false);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container">
          <div className="inner-body">
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                <div className="card-header">
                  <h3>Register</h3>
                </div>
                <div className="card-body">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                      </div>
                      <div>
                        <input
                          type="text"
                          name=""
                          className="form-control"
                          placeholder="Enter Username"
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
                        <span className="input-group-text">
                          <i className="fa fa-key" />
                        </span>
                      </div>
                      <div>
                        <input
                          type="password"
                          name=""
                          className="form-control"
                          placeholder="Enter Password"
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
                      <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                      </span>
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-lock" />
                        </span>
                      </div>
                      <div>
                        <input
                          type="password"
                          name=""
                          className="form-control"
                          placeholder="Re-enter Password"
                          onChange={this.onChange}
                          value={this.state.password2}
                          error={errors.password2}
                          id="password2"
                          type="password"
                          className={classnames("form-control", {
                            invalid: errors.password2
                          })}
                        />
                      </div>
                      <span className="red-text">
                        {errors.password2}
                      </span>
                    </div>
                    <form>
                      <div>
                        <h6>Choose Role:</h6>
                        <input
                          type="radio"
                          name="role"
                          value="Medium"
                          id="role"
                          onChange={this.onChange}
                          className="button"
                          defaultChecked
                        />
                        <label for="Medium">Medium</label>
                        <input
                          type="radio"
                          name="role"
                          value="High"
                          id="role"
                          onChange={this.onChange}
                          className="button"
                        />
                        <label for="High">High</label>
                      </div>
                    </form>
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Register"
                        className="btn float-right login_btn"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DeleteUser />
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

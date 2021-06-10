import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { emailUser } from "../../actions/authActions";
import classnames from "classnames";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../../css/contactUs.css";
import Logo from "../../images/works.png";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-rickiest.css";

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
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
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.emailUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <img src={Logo} className="center" />
        </div>
        <div style={{ paddingTop: 25, paddingBottom: 25 }}>
          <h1>Contact Us!</h1>
        </div>
        <form  onSubmit={this.onSubmit}>
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
              required
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
                <i className="fa fa-envelope iconCenter" />
              </span>
            </div>
            <input
              required
              type="email"
              className="form-control "
              placeholder="TS Email (s12345@com.il)"
              aria-describedby="basic-addon1"
              id="email"
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              style={{backgroundColor: '#fafafa', borderColor: '#b3e5e1', boxSizing: 'border-box', borderWidth: '2px', borderStyle: 'solid'}}
            />
          </div>

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
              required
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
          <div className="input-group mb-3 width">
            <div className="input-group-prepend ">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ backgroundColor: "#b3e5e1" }}
              >
                <i className="fa fa-lock iconCenter" />
              </span>
            </div>
            <input
              required
              type="password"
              className="form-control"
              placeholder="Re-enter Password"
              aria-describedby="basic-addon1"
              id="password2"
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              style={{backgroundColor: '#fafafa', borderColor: '#b3e5e1', boxSizing: 'border-box', borderWidth: '2px', borderStyle: 'solid'}}
            />
          </div>
          <span className="red-text error">
              {errors.password2}
          </span>
          <div>
          <AwesomeButton type="secondary" href="/" style={{ marginRight: '105px'}}> Already have an account? </AwesomeButton>
          <AwesomeButton type="primary" size="large" value="Register">
          Register
          </AwesomeButton>
          
          </div>
          
        </form>
       
      </div>
    );
  }
}

ContactUs.propTypes = {
  emailUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { emailUser })(withRouter(ContactUs));


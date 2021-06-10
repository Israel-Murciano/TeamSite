import React, { Component } from "react";
import Logout from "../authComponents/logout.component";
import TeamSitelogo from "../../images/logo.png";
import pic1 from "../../images/Tamir.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { whatRole } from "../../utils/rolesCheck";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-rickiest.css";

class Nav extends Component {
  render() {
    return (
      <div style={{ padding: "50px" }}>
        <nav className="navbar fixed-top navbar-expand-sm navbar-dark info-color blue-gradient">
          <a className="navbar-brand" href="/TeamSite">
          <img
                    src={TeamSitelogo}
                    style={{height:"65px", width:"65px"}}
                    alt="avatar-image"
                  />
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/*{<li className="nav-item">
                <a className="nav-link" href="/TeamSite">
                  Search
                </a>
                </li>*/}
                 <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Journal
                </a>
                <div
                  className="dropdown-menu dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <a className="dropdown-item" href="/TeamSite/events">
                    Events
                  </a>
                  <a className="dropdown-item" href="/TeamSite/switchovers">
                    Switchovers
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Procedures
                </a>
                <div
                  className="dropdown-menu dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <a className="dropdown-item" href="/TeamSite/nehalim">
                    Nehalim
                  </a>
                  {whatRole() > 1 &&
                    <a className="dropdown-item" href="/TeamSite/upload">
                      Upload
                    </a>}
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Backups
                </a>
                <div
                  className="dropdown-menu dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <a className="dropdown-item" href="/TeamSite/backups">
                    Commvault
                  </a>
                  <a className="dropdown-item" href="/TeamSite/mms">
                    MMS
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Active Site
                </a>
                <div
                  className="dropdown-menu dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <a className="dropdown-item" href="/TeamSite/apps">
                    Apps
                  </a>
                  <a className="dropdown-item" href="/TeamSite/svm">
                    SVM
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/TeamSite/tasks">
                  Tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/TeamSite/niturs">
                  Nitur
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/TeamSite/phones">
                  Phones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/TeamSite/shifts">
                  Shifts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/TeamSite/activities">
                  Activities
                </a>
              </li>
              {whatRole() > 2 &&
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>}
            </ul>
            <marquee behavior="alternate" direction="left">
                היי לינקדאין, לאחר כ-4 שנים בממר"ם מחפש את האתגר הבא שלי
            </marquee>

            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li class="nav-item avatar dropdown">
                <a
                  class="nav-link"
                  id="navbarDropdownMenuLink-55"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={pic1}
                    class="rounded-circle z-depth-3"
                    alt="avatar-image"
                  />
                </a>
                <div
                  class="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
                  aria-labelledby="navbarDropdownMenuLink-55"
                >
                  <AwesomeButton
                    type="primary"
                    className="dropdown-item"
                    size="medium"
                    style={{ margin: "10px" }}
                    onPress={() => {
                      window.location.href = "/TeamSite/myaccount";
                    }}
                  >
                    My Account
                    <i
                      className="fas fa-user-alt"
                      style={{ paddingLeft: "10px" }}
                    />
                  </AwesomeButton>

                  <AwesomeButton
                    type="secondary"
                    className="dropdown-item"
                    size="medium"
                    style={{ margin: "10px" }}
                  >
                  <div style={{float:'left'}}>
                    {" "}{<Logout />}
                    </div>
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ paddingLeft: "10px"}}
                    />
                    
                  </AwesomeButton>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;

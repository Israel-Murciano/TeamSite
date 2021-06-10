import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddApp from "../searchbarComponents/add-app.component";
import Edit from "../searchbarComponents/edit.component";
import Delete from "../searchbarComponents/delete.component";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { whatRole } from "../../utils/rolesCheck";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { AwesomeButton } from "react-awesome-button";
import ServersList from '../searchbarComponents/servers-list.component';
import Description from '../searchbarComponents/descriptions.component';
import Boss from '../searchbarComponents/boss.component';


export default class AppsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: []
    };
  }

  componentDidMount() {
    axios
      .get("http://" + node_host + ":" + node_port + "/api/apps")
      .then(res => {
        this.setState({ apps: res.data });
        console.log(this.state.apps);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://" + node_host + ":" + node_port + "/api/apps")
      .then(res => {
        this.setState({ apps: res.data });
      });
  }

  createBody() {
    var array = "";
    return (array = this.state.apps.map(function(item) {
      return (
        <tr>
          {whatRole() > 1 &&
            <td >
              <a>
                {" "}<Edit app={item.app} />{" "}
              </a>
              &nbsp;|&nbsp; &nbsp;
              <a>
                {" "}<Delete app={item.app} />{" "}
              </a>
            </td>}
          <td >
            {" "}{item.app}{" "}
          </td>
          <td >
            {" "}{item.site}{" "}
          </td>
          <td >
            {" "}{item.dbtype}{" "}
          </td>
          <td >
            {" "}{item.Primary}{" "}
          </td>
          <td >
            {" "}{item.url}{" "}
          </td>
          <td>
            <MDBDropdown>
                <MDBDropdownToggle color="info" style={{hight: "0px", width: "75px", padding: "0px"}} >
                Extras
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                <div >
                    <AwesomeButton type="secondary" size="small"  style={{margin: '10px'}}><Boss app={item.app} boss={item.boss} phone={item.phone}/></AwesomeButton>
                </div>
                <div>
                    <AwesomeButton type="secondary" size="small" style={{margin: '10px'}}><ServersList app={item.app} servers={item.servers}/></AwesomeButton>
                </div>
                <div >
                    <AwesomeButton type="secondary" size="medium"  style={{margin: '10px'}}><Description app={item.app} description={item.description}/></AwesomeButton>
                </div>
                </MDBDropdownMenu>
            </MDBDropdown>
          </td>  
        </tr>
      );
    }));
  }
  render() {
    return (
      <div style={{overflowY: "hidden"}}>
        {whatRole() > 1 && <AddApp />}
        <h1 style={{ margin: "25px" }}> <i className="fab fa-apple blue-text"> </i> Mivzai Apps  </h1>
        <table className="table table-blacked table-hover" style={{marginLeft: "auto",marginRight: "auto", width: "70%",overflowY: "hidden"}}>
          <thead className="thead-dark">
            <tr>
              <th> # </th>
              <th> App </th>
              <th> Site </th>
              <th> DB </th>
              <th> Primary </th>  
              <th> URL </th>       
              <th> Project Manager </th>          
            </tr>
          </thead>
          <tbody>
            {this.createBody()}
          </tbody>
        </table>
      </div>
    );
  }
}

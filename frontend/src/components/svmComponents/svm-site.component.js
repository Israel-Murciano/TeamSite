import React, { Component } from 'react';
import AddSVM from './add-svm.component';
import axios from "axios";
import { node_host, node_port } from "../../config";
import { whatRole } from "../../utils/rolesCheck";
import ShowVolumes from './show-svm.component'

//Importing .css.
import "../../css/table.css";
import "../../css/button.css";
import "../../css/modal.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import "../../css/svm.css";

export default class SvmSite extends Component {
    constructor(props) {
      super(props);
      this.state = {
        svms: []
      };
    }
  
    componentDidMount() {
      axios
        .get("http://" + node_host + ":" + node_port + "/api/svms")
        .then(res => {
          this.setState({ svms: res.data });
          console.log(this.state.svms);
        });
    }
  
    createBody() {
      var array = "";
      return (array = this.state.svms.map(function(item) {
        if (item.site) {
          if (item.site == "Site A"){
            return (
              <tr>
                <td >
                  {" "}{item.svm_name}{" "}
                </td>
                <td style={{color: 'lightgreen'}}>
                  {" "}{item.site}{" "}
                </td>
                <td >
                  {" "}{<ShowVolumes SVMid = {item._id} i = {0}/>}{" "}
                </td>
              </tr>
            )
          }
          if (item.site == "Site B"){
            return (
              <tr>
                <td >
                  {" "}{item.svm_name}{" "}
                </td>
                <td style={{color: 'blue'}}>
                  {" "}{item.site}{" "}
                </td>
                <td >
                  {" "}{<ShowVolumes SVMid = {item._id} i = {0}/>}{" "}
                </td>
              </tr>
            )
          }
          if (item.site == "Check Manual"){
            return (
              <tr>
                <td >
                  {" "}{item.svm_name}{" "}
                </td>
                <td style={{color: 'red'}}>
                  {" "}{item.site}{" "}
                </td>
                <td >
                  {" "}{<ShowVolumes SVMid = {item._id} i = {0}/>}{" "}
                </td>
              </tr>
            )
          }
        }
      }));
    }
    render() {
      return (
        <div style={{overflowY: "hidden"}}>
          {whatRole() > 1 && <AddSVM />}
          <h1 style={{ margin: "25px" }}> <i className="fas fa-hdd mr-3 blue-text"> </i> SVM Active Site </h1>
          <table className="table table-blacked table-hover" style={{marginLeft: "auto",marginRight: "auto", width: "18%",overflowY: "hidden"}}>
            <thead className="thead-dark">
              <tr>
                <th> SVM </th>
                <th> Site </th>
                <th> Volumes </th>
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
  
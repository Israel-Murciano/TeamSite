import React, { Component } from 'react';
import axios from "axios";
import { node_host, node_port } from "../../config";
import { whatRole } from "../../utils/rolesCheck";
import Moment from 'moment';

//Importing .css.
import "../../css/table.css";
import "../../css/button.css";
import "../../css/modal.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import "../../css/svm.css";

export default class MMS extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mms: []
      };
    }
  
    componentDidMount() {
      axios
        .get("http://" + node_host + ":" + node_port + "/api/mms")
        .then(res => {
          this.setState({ mms: res.data });
          console.log(this.state.mms);
        });
    }
  
    createBody() {
      var array = "";
      return (array = this.state.mms.map(function(item) {
        return (
          <tr>
            <td >
              {" "}{item.appname}{" "}
            </td>
            <td >
              {" "}{Moment(item.starttime).format("DD/MM/YYYY")}{" "}
            </td>
            <td >
              {" "}{Moment(item.expired_time).format("DD/MM/YYYY")}{" "}
            </td>
            <td style={{color: item.isok === "True" ? 'rgba(86, 211, 131, 1)':'red'}}>
              {" "}{item.isok}{" "}
            </td>
          </tr>
        );
      }));
    }
    render() {
      return (
        <div style={{overflowY: "hidden"}}>
          <h1 style={{ margin: "25px" }}> <i className="fab fa-envira mr-3 blue-text"> </i> MMS Backups </h1>
          <table className="table table-blacked table-hover" style={{marginLeft: "auto",marginRight: "auto", width: "50%",overflowY: "hidden"}}>
            <thead className="thead-dark">
              <tr>
                <th> Name </th>
                <th> Start Date </th>
                <th> Expired Date </th>
                <th> OK? </th>         
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
  
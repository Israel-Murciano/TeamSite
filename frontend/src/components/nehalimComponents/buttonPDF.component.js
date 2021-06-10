import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-rickiest.css";

class ButtonPDF extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.onClick = this.onClick.bind(this);
    }
    onClick() {
      axios.get("http://" + node_host + ":" + node_port + "/api/getpdf/" + this.props.pdfname, {
        methood: "GET",
        responseType : "blob"
      })
        .then(res => { 
          const files = new Blob([res.data], {type: "application/pdf"});
          const urldata = URL.createObjectURL(files);
          window.open(urldata);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    render() {
      return (
          <AwesomeButton type="primary" size="large" onPress={() => {this.onClick()}} >Open PDF</AwesomeButton>
      );
    }
  }

export default ButtonPDF;

 



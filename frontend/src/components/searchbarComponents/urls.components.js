import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import hpImg from "../../images/HP.png";
import { MDBBtn, MDBCardImage } from "mdbreact";

class Urls extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    };
  }

  componentDidMount() {
    axios.get("http://" + node_host + ":" + node_port + "/api/urls/").then(res => {
      this.setState({ urls: res.data });
    });
  }

  Url() {
    {
      return this.state.urls.map(url => {
          return(
            <div class="card card-cascade narrower test">
            <div class="view view-cascade overlay">
              <img class="card-img-top" src={hpImg} alt="Card image cap" />
              <a>
                <div class="mask rgba-black-slight" />
              </a>
            </div>
            <div class="card-body card-body-cascade test2">
              <h4 class="font-weight-bold card-title">{url.name}</h4>
              <a href={url.url} target="_blank">
                Go{" "}
              </a>
            </div>
          </div>
          )
      });
    }
  }

  render() {
    return (
      <div>
        {this.Url()}
      </div>
    );
  }
}

export default Urls;

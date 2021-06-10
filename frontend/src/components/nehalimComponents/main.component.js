import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import TeamSitelogo from "../../images/login.jpg";
import ButtonPDF from "./buttonPDF.component";
import ButtonDelete from './buttonDelete.component';
import '../../css/nohal.css';
import { whatRole } from "../../utils/rolesCheck";

const Result = props => {
  var {submitted} = props;
  if (props.results !== "Not Found") {
    if (props.submitted) {
      return props.results.map(item => {
        return (
          <div class="card card-cascade narrower test">
            <div class="view view-cascade overlay" style={{paddingBottom: '200px'}}>
              <img
                class="card-img-top"
                src={TeamSitelogo}
                alt="Card image cap"
                
              />
              <a>
                <div class="mask rgba-black-slight" />
              </a>
            </div>
            <div class="card-body card-body-cascade test2">
              <h4 class="font-weight-bold card-title" style={{color:'#2e84b2'}}>
                {item.name}
              </h4>
              <p class="card-text">You have a shitty life</p>
              <ButtonPDF pdfname={item.filename}/>
              {whatRole() > 1 &&
              <ButtonDelete pdfname={item.filename} />
              }
            </div>
          </div>

        );
      });
    } 
    else {
      return <div />
    }
  } 
  else {
    return <div>את הפלי</div>
  }
};

const Search = props => {
  const { searchQuery, onChange, onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
    <div className="form-group has-search ">
        <span className="search-icon fa fa-search form-control-feedback ">
          {" "}
        </span>
        <input
          className="main form-control"
          type="text"
          placeholder="חפש חפש אבאל'ה"
          value={searchQuery}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

class Nohal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      results: [],
      submitted: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({
      searchQuery: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    var searchbar = this.state.searchQuery;
    console.log("searchabar: " + searchbar);
    if (searchbar !== "") {
      axios
        .get("http://" + node_host + ":" + node_port + "/api/nehalim/" + searchbar)
        .then(res => {
          this.setState({
            results: res.data,
            submitted: true
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      this.setState({
        searchQuery: "",
        results: [],
        submitted: false
      });
    }
  }

  render() {
    return (
      <div>
        <h1 style={{marginTop: '30px', marginBottom: '50px'}}>
          <i
            className="fas fa-file-pdf mr-3 blue-text"
            aria-hidden="true"
          />
          <strong>PDF's</strong>
        </h1>
        <Search
          searchQuery={this.state.searchQuery}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <Result
          submitted={this.state.submitted}
          results={this.state.results}
          searchQuery={this.state.searchQuery}
        />
      </div>
    );
  }
}

export default Nohal;

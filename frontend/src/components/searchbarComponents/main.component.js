import React, { Component } from 'react';
import PropTypes from "prop-types";
import {node_host,node_port} from '../../config';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {whatRole} from '../../utils/rolesCheck';
import Edit from './edit.component';
import Delete from './delete.component';
import Add from './add-app.component';
import '../../css/searchbar.css';
import { Link } from "react-router-dom";
import {isAdmin, isHigh, isMedium, isLow} from '../../utils/rolesCheck';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import AddApp from '../searchbarComponents/add-app.component';


import GitLogo from "../../images/Git.png";

import "../../css/table.css";
import "../../css/button.css";
import "../../css/modal.css";
import ServersList from './servers-list.component';
import Description from './descriptions.component';

import { AwesomeButton } from "react-awesome-button";


function highlightStrings(string) {
   return <Highlighter searchWords={[searchbar]} textToHighlight={string} />
}
 


const Result = props => {
    if (props.results !== "Not Found") {
        if (props.submitted) {
            return (
                <table className="table table-striped table-hover table-borderless" style={{width: "70%", marginLeft: "auto",marginRight: "auto"}}>
                    <thead className="thead-dark">
                        <tr>
                            <th> # </th>
                            <th> App </th>
                            <th> Site </th>
                            <th> DB </th>
                            <th> Primary </th>  
                            <th> URL </th>
                            <th> Project Manager </th>
                            <th> Phone </th>
                            <th> Extra </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.results.map(function(item) {
                            return (
                                <tr>{(whatRole() > 1) && 
                                    <td> 
                                    
                                        <a > <Edit app={item.app}/> </a>
                                    
                                        &nbsp;|&nbsp; &nbsp;
                                      
                                        <a> <Delete app={item.app} /> </a>
                                       
                                    </td>
                                 }
                                 {(whatRole() < 2) && 
                                    <td>                                   
                                       
                                    </td>
                                 }
                                    <td> {highlightStrings(item.app)} </td>
                                    <td> {highlightStrings(item.site)} </td>
                                    <td> {highlightStrings(item.dbtype)} </td>
                                    <td> {highlightStrings(item.Primary)} </td>
                                    <td> {highlightStrings(item.url)} </td>
                                    <td> {highlightStrings(item.boss)} </td>
                                    <td> {highlightStrings(item.phone)} </td>
                                    <td>
                                        <MDBDropdown>
                                            <MDBDropdownToggle color="info" style={{hight: "0px", width: "75px", padding: "0px"}}>
                                            Extras
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu basic>
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
                                )
                            })
                        }
                        </tbody>
                </table>
            )
        } 
        else {
            return <div> </div>
        }
    } 
    else {
        return <div><p>החיפוש נגמרה</p>התוצאות שלה, לא כמו שאתה חושב</div>
    }
}

const Search = props => {
    const { searchQuery, onChange, onSubmit } = props;
    return (
      <form onSubmit={onSubmit}>
        <div className="form-group has-search ">
          <span className="search-icon fa fa-search form-control-feedback ">
          </span>
          <input
            className="main form-control"
            type="text"
            placeholder="חפש חפש אפליקציות אבאל'ה"
            value={searchQuery}
            onChange={onChange}
          />
        </div>
      </form>
    );
};

var searchbar="";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [],
            submitted: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        event.preventDefault();
        this.setState({value: event.target.value});
    }
    onSubmit(event){
        event.preventDefault();
        searchbar = this.state.value
        if (this.state.value !== "" ) {
            axios.get('http://' + node_host + ':' + node_port + '/api/search/' + this.state.value)
                .then (res => {
                        this.setState({
                            data: res.data,
                            submitted: true
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
            this.setState({
                value: '',
                submitted: false
            })
        }
    }

    render () {
        return (
            <div>
                <h1 style={{ margin: "25px" }}> <i className="fas fa-home mr-3 blue-text"> </i> La Casa</h1>

                <p>
                <a target="_blank" href="?????"><img style={{border: "1px solid black", borderRadius: "5px", margin: "5px"}} alt="Git" src={GitLogo} width="100"/></a>
                </p>
                
                <Search
                    searchQuery={this.state.searchQuery}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />

                <Result
                    submitted={this.state.submitted}
                    results={this.state.data}
                    searchQuery={this.state.searchQuery}
                />
            </div>
        )
    }
}

export {SearchForm};

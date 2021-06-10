import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '../../css/switchover.css';
import moment from 'moment';
import AddSwitchovers from './add-switchover.component';
import EditSwitchovers from './edit-switchover.component';

export default class SwitchoverList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            apps: []
        }
    }
    
    componentDidMount() {
        axios.get("http://" + node_host + ":" + node_port + "/api/switchovers")
        .then (res => {
                this.setState({
                    data: res.data
                })
            })
    }
 
    createBody() {
        return this.state.data.map(item => {
            console.log(item)
            return (
                <tr>
                    <td style={{fontSize: "15px"}}> {item.app} </td>                    
                    <td style={{fontSize: "15px"}}> {moment(item.Switchovers[item.Switchovers.length - 1].switchoverStartDate).format("DD/MM/YYYY")} , {item.Switchovers[item.Switchovers.length - 1].switchoverStartTime} </td> 
                    <td style={{fontSize: "15px"}}> {moment(item.Switchovers[item.Switchovers.length - 1].switchoverEndDate).format("DD/MM/YYYY")} , {item.Switchovers[item.Switchovers.length - 1].switchoverEndTime} </td>   
                    <td style={{fontSize: "15px"}}> {item.Switchovers[item.Switchovers.length - 1].switchoverDuration} </td>
                    <td style={{fontSize: "15px"}}> {item.Switchovers[item.Switchovers.length - 1].originSite} -> {item.Switchovers[item.Switchovers.length - 1].destinationSite} </td> 
                    <td style={{fontSize: "15px"}}> {item.Switchovers[item.Switchovers.length - 1].details} </td> 
                    <td style={{fontSize: "15px"}}> <EditSwitchovers switchid = {item._id} i = {0}/> </td> 
                </tr>
            )
        }).reverse();
    }
    
    render () {
        return (
            <div className="table-responsive table-borderless">
                <h1 style={{ margin: "25px" }}> <i className="fas fa-sync fa-spin blue-text"> </i> &nbsp;  Switchovers </h1>
                <table className="table " style={{marginLeft: "auto",marginRight: "auto", width: "60%"}}> 
                    <thead className="thead-dark">
                        <tr>
                            <th> App </th>
                            <th> Start Time </th>
                            <th> End Time </th>
                            <th> Duration </th>
                            <th> Site2Site </th>
                            <th> Details </th>
                            <th> <i className="fa fa-external-link-alt"></i> </th>
                        </tr>
                    </thead>          
                    { 
                        this.createBody()
                    }
                </table>
                <AddSwitchovers />
            </div>
        )
    }
}


//     

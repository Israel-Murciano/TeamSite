import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '../../css/switchover.css';
import EditBackup from './add-backup.component'
import moment from 'moment';


/*function createSecretTD(item,id) {
    return item.FailedJobs.map(function(date,key) {
        if (key != 0) {
            return (
                <tr>
                    <td id={id} className="collapse in p-3"> </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> {item.FailedJobs[key].instancename} </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> {item.FailedJobs[key].subclientname} </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> {item.FailedJobs[key].starttime} </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> {item.FailedJobs[key].endtime} </td>
                    <td id={id} className="collapse in p-3" style={{background: item.FailedJobs[key].status === "Failed" ? 'rgba(239, 61, 61, 0.90)':'rgba(255, 248, 106, 0.90)'}}> {item.FailedJobs[0].status} </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> {item.FailedJobs[key].failurereason} </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> </td>
                    <td id={id} className="collapse in p-3" style={{background: "lightgray"}}> </td>
                </tr>
            )
        }
    })
}*/

function checkIfBackupExist(item) {
    if (item != null) {
        return true;
    }
    else return false;
}

export default class BackupsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }
    
    componentDidMount() {
        axios.get("http://" + node_host + ":" + node_port + "/api/backups")
        .then (res => {
                this.setState({
                    data: res.data
                })
            })
    }
 
    createBody() {
        return this.state.data.map(function(item,key) {
            var dataParent = "#accordion" + key;
            var href = "#collapse" + key;
            var idtr = "accordion" + key;
            var idtd = "collapse" + key;
            return (
                <tbody key={key}>
                    <tr className="accordion-toggle collapsed" id={idtr} data-toggle="collapse" data-parent={dataParent} href={href} style={{border: "1px solid black", background: item.comment === "" ? '':'rgba(153, 255, 204, 0.90)'}}>
                        {
                            checkIfBackupExist(item.nodename) &&
                            <td > {item.nodename} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td style={{width: "150px"}} > {item.FailedJobs[0].instancename} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td style={{width: "150px"}}> {item.FailedJobs[0].subclientname} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td style={{width: "150px"}}> {moment(item.FailedJobs[0].starttime).format("DD/MM/YYYY LTS")} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td style={{width: "150px"}}> {moment(item.FailedJobs[0].endtime).format("DD/MM/YYYY LTS")} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td style={{background: item.FailedJobs[0].status === "Failed" ? 'rgba(239, 61, 61, 0.90)':'rgba(255, 248, 106, 0.90)'}}> {item.FailedJobs[0].status} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td style={{width: "500px"}}> {item.FailedJobs[0].failurereason} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td> {item.name} - {item.comment} </td>
                        }
                        {
                            checkIfBackupExist(item.nodename) &&
                                <td> <EditBackup backupid = {item._id} i = {[0]}/></td>
                        }
                    </tr>
                </tbody>
            )
        })
    }
    
    render () {
        return (
            <div className="table-responsive table-borderless">
                <h1 style={{ margin: "25px" }}> <i className="fas fa-save blue-text"> </i> &nbsp;  Backups </h1>
                <table className="table " style={{marginLeft: "auto",marginRight: "auto", width: "75%"}}> 
                    <thead className="thead-dark">
                        <tr>
                            <th> Node Name </th>
                            <th> Instance Name </th>
                            <th> Subclient Name </th>
                            <th> Start Time	</th>
                            <th> End Time </th>
                            <th> Status </th>
                            <th> Failure Reason </th>
                            <th> Comment </th>
                            <th> <i className="fa fa-edit"></i> </th>
                        </tr>
                    </thead>
                    { 
                        this.createBody()
                    }
                </table>
            </div>
        )
    }
}
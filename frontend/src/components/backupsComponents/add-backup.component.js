import React, { Component } from 'react';
import {connect,NameForm} from "../searchbarComponents/main.component";
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
import {node_host,node_port} from '../../config';
import "../../css/div.css"
import moment from 'moment';


class EditBackup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastfailed: [],
            backupcomments: [],
            humans: [],
            nodename: '',
            instancename: '',
            subclientname: '',
            starttime: '',
            endtime: '',
            status: '',
            failurereason: '',
            comment: '',
            name: '',
        }

        this.onChangenodename = this.onChangenodename.bind(this);
        this.onChangeinstancename = this.onChangeinstancename.bind(this);
        this.onChangesubclientname = this.onChangesubclientname.bind(this);
        this.onChangestarttime = this.onChangestarttime.bind(this);
        this.onChangeendtime = this.onChangeendtime.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);
        this.onChangefailurereason = this.onChangefailurereason.bind(this);
        this.onChangecomment = this.onChangecomment.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/backups/'+this.props.backupid)
            .then(Response => {
                this.setState({
                    nodename: Response.data.nodename,
                    instancename: Response.data.FailedJobs[this.props.i].instancename,
                    subclientname: Response.data.FailedJobs[this.props.i].subclientname,
                    starttime: Response.data.FailedJobs[this.props.i].starttime,
                    endtime: Response.data.FailedJobs[this.props.i].endtime,
                    status: Response.data.FailedJobs[this.props.i].status,
                    failurereason: Response.data.FailedJobs[this.props.i].failurereason,
                    comment: Response.data.comment,
                    name: Response.data.name,
                    lastfailed: Response.data.FailedJobs,
                })
            })
        axios.get('http://' + node_host + ':' + node_port + '/api/humans/')
            .then(response => {
                this.setState({
                    humans: response.data,
                })
            })
    }

    onToggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    // Update Methods
    onChangenodename(e) {
        console.log("vomponrn");
        this.setState({
            nodename: e.target.value
        });
    }
    onChangeinstancename(e) {
        console.log("user");
        this.setState({
            instancename: e.target.value
        });
    }
    onChangesubclientname(e) {
        console.log("pass");
        this.setState({
            password: e.target.value
        });
    }
    onChangestarttime(e) {
        console.log("pass");
        this.setState({
            starttime: e.target.value
        });
    }
    onChangeendtime(e) {
        console.log("pass");
        this.setState({
            endtime: e.target.value
        });
    }
    onChangestatus(e) {
        console.log("pass");
        this.setState({
            status: e.target.value
        });
    }
    onChangefailurereason(e) {
        this.setState({
            failurereason: e.target.value
        });
    }
    onChangecomment(e) {
        console.log("pass");
        this.setState({
            comment: e.target.value
        });
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    humansList() {
        return this.state.humans.map(singleHuman => {
          return <option value={singleHuman.name}>{singleHuman.name}</option>;
        });
    }

    createBody()
    {
        axios.get('http://' + node_host + ':' + node_port + '/api/backupcomments/'+this.state.nodename)
        .then(res => {
            this.setState({
                backupcomments: res.data,
            })
        })

        return this.state.backupcomments.map(item => {
            return (
                <tr>
                    <td> {moment(item.updatedAt).format("DD/MM/YYYY LTS")} </td>
                    <td> {item.instancename} </td>
                    <td> {item.subclientname} </td>
                    <td style={{direction: "rtl"}}> {item.comment} </td>
                    <td> {item.name}</td>
                </tr>
            )
        }).reverse();
    }

    createBody2() {
        return this.state.lastfailed.map(item2 => {
            console.log(item2)
            return (
                <tr>
                    <td style={{fontSize: "12px"}}> {item2.instancename} </td> {/*instancename*/}
                    <td style={{fontSize: "12px"}}> {item2.subclientname} </td> {/*subclientname*/}
                    <td style={{fontSize: "12px"}}> {moment(item2.starttime).format("DD/MM/YYYY LTS")} </td> {/*starttime*/}
                    <td style={{fontSize: "12px"}}> {moment(item2.endtime).format("DD/MM/YYYY LTS")} </td> {/*endtime*/} 
                    <td style={{fontSize: "12px", background: item2.status === "Failed" ? 'rgba(239, 61, 61, 0.90)':'rgba(255, 248, 106, 0.90)'}}> {item2.status} </td> 
                    <td style={{fontSize: "10px"}}> {item2.failurereason} </td> {/*failurereason*/}
                </tr>
            )
        }).reverse();
    }

    onSubmit(e) {
        e.preventDefault();

        const backup = {
            nodename: this.state.nodename,
            comment: this.state.comment,
            name: this.state.name,
        }

        const backup2 = {
            nodename: this.state.nodename,
            subclientname: this.state.subclientname,
            instancename: this.state.instancename,
            comment: this.state.comment,
            name: this.state.name,
        }

        axios.post('http://' + node_host + ':' + node_port + '/api/backups/update/'+this.props.backupid, backup)
            .then(res => console.log(res.data));

        axios.post('http://' + node_host + ':' + node_port + '/api/backupcomments/add/', backup2)
            .then(res => console.log(res.data));

        window.location = '/TeamSite/backups';
    }

    render() {
        return (
            <div className="fa fa-edit" onClick={this.onToggle}>   
            <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg">
                <ModalHeader toggle={this.toggle} style={{color: "rgb(0, 128, 200)"}}> Add Comment </ModalHeader>
                <form onSubmit={this.onSubmit}>
                    <ModalBody>
                        <div  id="left" style={{width:200}}>
                            <div>
                                <label style={{paddingTop: '1px'}}>Node Name: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.nodename}
                                        required
                                        disabled
                                />
                            </div>
                            <div>
                                <label>Instance Name: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.instancename}
                                        onChange={this.onChangeinstancename}
                                        required
                                        disabled
                                />
                            </div>
                            <div>
                                <label>Subclient Name: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.subclientname}
                                        onChange={this.onChangesubclientname}
                                        required
                                        disabled
                                />
                            </div>
                            <div>
                                <label>Start Time: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.starttime}
                                        onChange={this.onChangestarttime}
                                        required
                                        disabled
                                />
                            </div>
                            <div>
                                <label>End Time: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.endtime}
                                        onChange={this.onChangeendtime}
                                        required
                                        disabled
                                />
                            </div>
                            <div>
                                <label>Status: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.status}
                                        onChange={this.onChangestatus}
                                        required
                                        disabled
                                />
                            </div>
                        </div>

                        <div id="right" style={{width:500}}>
                            <div>
                                <label>Failure Reason: </label>
                                <textarea cols="50" rows="11" 
                                        style={{height:145}}
                                        required
                                        className="form-control"
                                        value={this.state.failurereason}
                                        onChange={this.onChangefailurereason}
                                        required
                                    />
                            </div>
                            <div>
                                <label>Comment: </label>
                                <textarea cols="50" rows="11" 
                                        style={{direction: "rtl", height:125}}
                                        className="form-control"
                                        value={this.state.comment}
                                        onChange={this.onChangecomment}
                                    />
                            </div>
                            <div className="form-group"  >
                                    <label>Name: </label>
                                    <select style={{direction: "rtl"}} className="form-control" required onChange={this.onChangeName}>
                                    <option value="">{this.state.name}</option>
                                    {this.humansList()}
                                    </select>
                            </div>  
                        </div>
                        <div>
                        <table className="table table-striped table-hover" style={{margeinTop: 20}}>
                                <thead>
                                    <tr>
                                        <th> Instance Name </th>
                                        <th> Subclient Name </th>
                                        <th> Start Time	</th>
                                        <th> End Time </th>
                                        <th> Status </th>
                                        <th> Failure Reason </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.createBody2()}
                                </tbody>
                            </table>
                            <table className="table table-striped table-hover" style={{margeinTop: 20}}>
                                <thead>
                                    <tr>
                                        <th> Date </th>
                                        <th> Instance Name </th>
                                        <th> Subclient Name </th>
                                        <th> Comment </th>
                                        <th> Name </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.createBody()}
                                </tbody>
                            </table>
                            <ModalFooter>
                                <Button color="primary" type="submit"> Add </Button>
                                <Button color="secondary" onClick={this.onToggle}> Cancel </Button>
                            </ModalFooter>   
                        </div>
                    </ModalBody>
                </form>
            </Modal>
        </div>
        )
                
    }
}

export default EditBackup;
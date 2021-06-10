import React, { Component } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import {node_host,node_port} from '../../config';
import "../../css/div.css";
import { whatRole } from "../../utils/rolesCheck";

class EditSwitchovers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apps: [],
            appstable: [],
            app: '',
            switchoverStartDate: '',
            switchoverStartTime: '',
            switchoverEndDate: '',
            switchoverEndTime: '',
            switchoverDuration: '',
            originSite: 'Site A',
            destinationSite: 'Site A',
            details: ''
        };

        this.onChangeApp = this.onChangeApp.bind(this);
        this.onChangeSwitchoverStartDate = this.onChangeSwitchoverStartDate.bind(this);
        this.onChangeSwitchoverStartTime = this.onChangeSwitchoverStartTime.bind(this);
        this.onChangeSwitchoverEndDate = this.onChangeSwitchoverEndDate.bind(this);
        this.onChangeSwitchoverEndTime = this.onChangeSwitchoverEndTime.bind(this);
        this.onChangeSwitchoverDuration = this.onChangeSwitchoverDuration.bind(this);
        this.onChangeOriginSite = this.onChangeOriginSite.bind(this);
        this.onChangeDestinationSite = this.onChangeDestinationSite.bind(this);
        this.onChangeDetails = this.onChangeDetails.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/switchovers/'+this.props.switchid)
        .then(res => {
            this.setState({
                app: res.data.app,
                appstable: res.data.Switchovers
                })
        })
        axios.get('http://' + node_host + ':' + node_port + '/api/switchovers/getApps')
        .then(res => {
            this.setState({
                apps: res.data
            })
        })
    }
    onChangeApp(e) {
        this.setState({
            app: e.target.value
        })
    }
    onChangeSwitchoverStartDate(e) {
        this.setState({
            switchoverStartDate: e.target.value
        })
    }
    onChangeSwitchoverStartTime(e) {
        this.setState({
            switchoverStartTime: e.target.value
        })
    }
    onChangeSwitchoverEndDate(e) {
        this.setState({
            switchoverEndDate: e.target.value
        })
    }
    onChangeSwitchoverEndTime(e) {
        this.setState({
            switchoverEndTime: e.target.value
        })
    }
    onChangeSwitchoverDuration(e) {
        this.setState({
            switchoverDuration: e.target.value
        })
    }
    onChangeOriginSite(e) {
        this.setState({
            originSite: e.target.value
        })
    }
    onChangeDestinationSite(e) {
        this.setState({
            destinationSite: e.target.value
        })
    }
    onChangeDetails(e) {
        this.setState({
            details: e.target.value
        })
    }
    onToggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    deleteSwitchover(id) {
        axios.post('http://' + node_host + ':' + node_port + '/api/switchovers/remove/'+id)
            .then(res => console.log(res.data));
            window.location.reload(false);
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            app: this.state.app,
            switchoverStartDate: this.state.switchoverStartDate,
            switchoverStartTime: this.state.switchoverStartTime,
            switchoverEndDate: this.state.switchoverEndDate,
            switchoverEndTime: this.state.switchoverEndTime,
            switchoverDuration: this.state.switchoverDuration,
            originSite: this.state.originSite,
            destinationSite: this.state.destinationSite,
            details: this.state.details
        }
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/switchovers/update/'+this.props.switchid, obj)
        
        // Refresh the Page
        window.location.reload(false);
    }

    createBody() {
        return this.state.appstable.map(item2 => {
            console.log(item2)
            return (
                <tr>
                    <td style={{fontSize: "15px"}}> {Moment(item2.switchoverStartDate).format("DD/MM/YYYY")} , {item2.switchoverStartTime} </td> {/*instancename*/}
                    <td style={{fontSize: "15px"}}> {Moment(item2.switchoverEndDate).format("DD/MM/YYYY")} , {item2.switchoverEndTime} </td> {/*subclientname*/}
                    <td style={{fontSize: "15px"}}> {item2.switchoverDuration} </td> {/*starttime*/}
                    <td style={{fontSize: "15px"}}> {item2.originSite} -> {item2.destinationSite} </td> {/*endtime*/} 
                    <td style={{fontSize: "15px"}}> {item2.details} </td>
                    <td> {whatRole() > 2 &&<a href color="red" onClick={() => { if(window.confirm('Are you SURE you want to delete this event?'))this.deleteSwitchover(item2._id)}}><i class="fa fa-trash-alt" style={{color:"black"}}></i></a>} </td> 
                </tr>
            )
        }).reverse();
    }

    appsSelect() {
        console.log(this.state.apps);
        return this.state.apps.map(app => 
            <option value={app.app}> {app.app} </option>
        ) 
    }
    render() {
        return (
            <div className="fa fa-external-link-alt" onClick={this.onToggle}>   
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg">
                    <ModalHeader toggle={this.toggle} style={{color: "rgb(0, 128, 200)"}}> {this.state.app} History </ModalHeader>
                        <form onSubmit={this.onSubmit}>
                            <ModalBody>
                                    <table className="table table-striped table-hover" style={{margeinTop: 20}}>
                                        <thead>
                                            <tr>
                                                <th> Start Time </th>
                                                <th> End Time </th>
                                                <th> Duration </th>
                                                <th> Site2Site </th>
                                                <th> Details </th>
                                                <th>  </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.createBody()}
                                        </tbody>
                                    </table>
                            </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.onToggle}> Exit </Button>
                        </ModalFooter>  
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default EditSwitchovers;
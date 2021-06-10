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
import moment from 'moment';
import {node_host,node_port} from '../../config';
import "../../css/div.css";



class AddSwitchovers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apps: [],
            switchoverStart: '',
            switchoverEnd: '',
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
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/apps/')
        .then(response => {
            this.setState({
                apps: response.data,
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
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Save Button 
    onSubmit(e) {
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
        axios.post('http://' + node_host + ':' + node_port + '/api/switchovers/add/', obj)
        
        // Refresh the Page
        //window.location.reload(false);
    }

    appsSelect() {
        console.log(this.state.apps);
        return this.state.apps.map(app => 
            <option value={app.app}> {app.app} </option>
        ) 
    }
    render() {
        return (
                <div>
                    <button className="btn-circle slideInUp" onClick={this.toggle}><i className="fa fa-plus"> </i> </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} >
                        <ModalHeader toggle={this.toggle}> Add Switchover </ModalHeader>
                        <form onSubmit={this.onSubmit}>
                            <ModalBody>
                                    <div className="form-group element">
                                        <label>App </label> &nbsp;
                                        <select value={this.state.app} onChange={this.onChangeApp}>
                                            {
                                                this.appsSelect()
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Start Date: </label>
                                        <input 
                                            style={{direction: "rtl"}}
                                            type="date"
                                            name="start-date"
                                            required
                                            className="form-control"
                                            value={this.state.switchoverStartDate}
                                            onChange={this.onChangeSwitchoverStartDate}
                                        />
                                    </div>
                                    <div className="form-group"  >
                                        <label>Start Time: </label>
                                        <input 
                                            style={{direction: "rtl"}}
                                            type="time"
                                            name="start-time"
                                            required
                                            className="form-control"
                                            value={this.state.switchoverStartTime}
                                            onChange={this.onChangeSwitchoverStartTime}
                                        />
                                    </div>  
                                    <div className="form-group">
                                        <label>End Date: </label>
                                        <input 
                                            style={{direction: "rtl"}}
                                            type="date"
                                            name="start-date"
                                            required
                                            className="form-control"
                                            value={this.state.switchoverEndDate}
                                            onChange={this.onChangeSwitchoverEndDate}
                                        />
                                    </div>
                                    <div className="form-group"  >
                                        <label>End Time: </label>
                                        <input 
                                            style={{direction: "rtl"}}
                                            type="time"
                                            name="start-time"
                                            required
                                            className="form-control"
                                            value={this.state.switchoverEndTime}
                                            onChange={this.onChangeSwitchoverEndTime}
                                        />
                                    </div> 
                                    <div className="form-group element">
                                        <label>From: </label> &nbsp;
                                        <select value={this.state.originSite} onChange={this.onChangeOriginSite}>
                                            <option value="Site A" >Site A</option>
                                            <option value="Site B" >Site B</option>
                                        </select>
                                        &nbsp;  &nbsp;
                                        <label>To: </label> &nbsp;
                                        <select value={this.state.destinationSite} onChange={this.onChangeDestinationSite}>
                                            <option select="selected" value="Site A">Site A</option>
                                            <option value="Site B">Site B</option>
                                        </select>
                                    </div>
                                    <div className="form-group element">
                                        <label>Duration: </label>
                                        <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.switchoverDuration}
                                        onChange={this.onChangeSwitchoverDuration}
                                        />
                                    </div>
                                    <div className="form-group element">
                                        <label>Details: </label>
                                        <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.details}
                                        onChange={this.onChangeDetails}
                                        />
                                    </div>
                            </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit"> Add </Button>
                            <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default AddSwitchovers;

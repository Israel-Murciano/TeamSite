import React, { Component } from 'react';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '../../css/modal.css';
import "../../css/div.css";
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';



class AddApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
              modal: false,
              backdrop: true,
              app: '',
              url: '',
              site: '',
              primary: '',
              description: '',
              dbtype: '',
              servers: '',
              alteon: '',
              ips: '',
              last_switchover_date: '',
              switchover_time: '',
              phone: '',
              boss: ''
        };

        this.app = this.app.bind(this);
        this.url = this.url.bind(this);
        this.site = this.site.bind(this);
        this.primary = this.primary.bind(this);
        this.description = this.description.bind(this);
        this.dbtype = this.dbtype.bind(this);
        this.servers = this.servers.bind(this);
        this.alteon = this.alteon.bind(this);
        this.ips = this.ips.bind(this);
        this.last_switchover_date = this.last_switchover_date.bind(this);
        this.switchover_time = this.switchover_time.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.boss = this.boss.bind(this);
        this.phone = this.phone.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    // Update Methods
    app(e) {
        this.setState({
            app: e.target.value
        });
    }
    url(e) {
        this.setState({
            url: e.target.value
        });
    }
    site(e) {
        this.setState({
            site: e.target.value
        })
    }
    primary(e) {
        this.setState({
            primary: e.target.value
        })
    }
    description(e){
        this.setState({
            description: e.target.value
        });
    }
    dbtype(e) {
        this.setState({
            dbtype: e.target.value
        })
    }
    servers(e) {
        this.setState({
            servers: e.target.value
        })
    }
    alteon(e) {
        this.setState({
            alteon: e.target.value
        })
    }
    ips(e) {
        this.setState({
            ips: e.target.value
        })
    }
    last_switchover_date(e) {
        this.setState({
            last_switchover_date: e.target.value
        })
    }
    switchover_time(e) {
        this.setState({
            switchover_time: e.target.value
        })
    }
    boss(e) {
        this.setState({
            boss: e.target.value
        })
    }
    phone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            app: this.state.app,
            url: this.state.url,
            site: this.state.site,
            description: this.state.description,
            dbtype: this.state.dbtype,
            servers: this.state.servers,
            alteon: this.state.alteon,
            ips: this.state.ips,
            last_switchover_date: this.state.last_switchover_date,
            switchover_time: this.state.switchover_time,
            primary: this.state.primary,
            boss: this.state.boss,
            phone: this.state.phone,
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/app/add/', obj)
        
        // Refresh the Page
        window.location.reload(false);
    }

    render() {
        return (
                <div>
                    <button className="btn-circle slideInUp" onClick={this.toggle}>
                        <i className="fa fa-plus"> </i>
                    </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg">
                        <ModalHeader toggle={this.toggle} style={{color: "rgb(0, 128, 200)"}}> Adding an App </ModalHeader>
                            <ModalBody>
                                <div id="left-2">
                                    <div className="form-group">
                                        <label style={{paddingTop: '1px'}}> App: </label>
                                        <input  
                                            type="text"
                                            className="form-control"
                                            value={this.state.app}
                                            onChange={this.app}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> URL: </label>
                                        <input  
                                            type="text"
                                            className="form-control"
                                            value={this.state.url}
                                            onChange={this.url}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Description: </label>
                                        <textarea cols="50" rows="11" 
                                            style={{direction: "rtl", height:260}}
                                            required
                                            className="form-control"
                                            value={this.state.description}
                                            onChange={this.description}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Project Manager: </label>
                                        <input  
                                            type="text"
                                            className="form-control"
                                            value={this.state.boss}
                                            onChange={this.boss}
                                            required
                                        />
                                    </div>
                                </div>
                                <div id="right-2">
                                    <div className="form-group">
                                        <label> DB: </label>
                                        <input  
                                            type="text"
                                            className="form-control"
                                            value={this.state.dbtype}
                                            onChange={this.dbtype}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Servers: </label>
                                        <textarea cols="50" rows="11" 
                                            style={{height:340}}
                                            required
                                            className="form-control"
                                            value={this.state.servers}
                                            onChange={this.servers}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Phone: </label>
                                        <input  
                                            type="text"
                                            className="form-control"
                                            value={this.state.phone}
                                            onChange={this.phone}
                                            required
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" type="submit" onClick={this.onSubmit}> Add </Button>
                                <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                            </ModalFooter>
                    </Modal>
                </div>
        )
                
    }
}

export default AddApp;
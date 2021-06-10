import React, { Component } from 'react';
import axios from 'axios';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
import '../../css/edit.css';
import {node_host,node_port} from '../../config';



class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
              modal: false,
              backdrop: true,
              app: '',
              url: '',
              site: '',
              kapat: '',
              description: '',
              dbtype: '',
              servers: '',
              alteon: '',
              ips: '',
              last_switchover_date: '',
              switchover_time: '',
              mevudelet: '',
              tiful: '',
              phone: '',
              boss: ''
        };

        this.app = this.app.bind(this);
        this.url = this.url.bind(this);
        this.site = this.site.bind(this);
        this.kapat = this.kapat.bind(this);
        this.description = this.description.bind(this);
        this.dbtype = this.dbtype.bind(this);
        this.servers = this.servers.bind(this);
        this.alteon = this.alteon.bind(this);
        this.ips = this.ips.bind(this);
        this.last_switchover_date = this.last_switchover_date.bind(this);
        this.switchover_time = this.switchover_time.bind(this);
        this.mevudelet = this.mevudelet.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.tiful = this.tiful.bind(this);
        this.toggle = this.toggle.bind(this);
        this.boss = this.boss.bind(this);
        this.phone = this.phone.bind(this);
    }

    componentDidMount () {
        axios.get('http://' + node_host + ':' + node_port + '/api/app/' + this.props.app)
            .then(response => {
                this.setState({
                    app: response.data.app,
                    url: response.data.url,
                    site: response.data.site,
                    kapat: response.data.kapat,
                    description: response.data.description,
                    dbtype: response.data.dbtype,
                    servers: response.data.servers,
                    alteon: response.data.alteon,
                    ips: response.data.ips,
                    last_switchover_date: response.data.last_switchover_date,
                    switchover_time: response.data.switchover_time,
                    mevudelet: response.data.mevudelet,
                    tiful: response.data.tiful,
                    boss: response.data.boss,
                    phone: response.data.phone
                })
            })
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
    kapat(e) {
        this.setState({
            kapat: e.target.value
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
    mevudelet(e) {
        this.setState({
            mevudelet: e.target.value
        })
    }
    tiful(e) {
        this.setState({
            tiful: e.target.value
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
            kapat: this.state.kapat,
            description: this.state.description,
            dbtype: this.state.dbtype,
            servers: this.state.servers,
            alteon: this.state.alteon,
            ips: this.state.ips,
            last_switchover_date: this.state.last_switchover_date,
            switchover_time: this.state.switchover_time,
            mevudelet: this.state.mevudelet,
            tiful: this.state.tiful,
            boss: this.state.boss,
            phone: this.state.phone,
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/update/' + this.props.app, obj)
        // Refresh the Page
        window.location.reload(false);

    }

    render() {
        return (
                <div className="fa fa-pencil-alt" onClick={this.toggle}>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop} size="lg">
                        <ModalHeader toggle={this.toggle}> {this.state.app} </ModalHeader>
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
                            <Button color="primary" onClick={this.onSubmit}> Save </Button>
                            <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                        </ModalFooter>
                    </Modal>
                </div>

        )
                
    }
}

export default Edit;
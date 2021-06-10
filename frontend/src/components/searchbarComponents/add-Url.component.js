import React, { Component } from 'react';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '../../css/modal.css'
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';



class AddUrl extends Component {
    constructor(props) {
        super(props);

        this.state = {
              modal: false,
              backdrop: true,
              url: '',
              name: '',
        };

        this.url = this.url.bind(this);
        this.name = this.name.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    // Update Methods
    url(e) {
        this.setState({
            url: e.target.value,
   
        });
    }
    name(e) {
        this.setState({
            name: e.target.value
   
        });
    }

    


    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            url: this.state.url,
            name: this.state.name

        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/urls/add/', obj)

        // Refresh the Page
        window.location.reload(false);
    }

    render() {
        return (
                <div>
                    <button className="btn-circle slideInUp" onClick={this.toggle}>
                        <i className="fa fa-plus"> </i>
                    </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} >
                        <ModalHeader toggle={this.toggle}> Adding an Url </ModalHeader>
                        <form onSubmit={this.onSubmit}>
                            <ModalBody>
                                    <div>
                                        <label style={{paddingTop: '1px'}}> Url: </label>
                                        <input  type="text"
                                                className="form-control"
                                                value={this.state.url}
                                                onChange={this.url}
                                                required
                                        />
                                    </div>
                                    <div>
                                        <label> Name: </label>
                                        <input  type="text"
                                                className="form-control"
                                                value={this.state.name}
                                                onChange={this.name}
                                                required
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

export default AddUrl;
import React, { Component } from 'react';
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

class AddPhone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            number: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Update Methods
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        });
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            number: this.state.number
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/phones/add/', obj)
            .then (
                    response => console.log("in axsios" +response.data)
                 );
        
        // Refresh the Page
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <button className="btn-circle slideInUp" onClick={this.toggle}><i className="fa fa-plus"> </i> </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg">
                    <ModalHeader toggle={this.toggle}> Add Phone </ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div>
                                <div className="form-group element">
                                    <label>Name: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="text"
                                        required
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                    />
                                </div>
                                <div className="form-group element"  >
                                    <label>Number: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="text"
                                        required
                                        className="form-control element"
                                        value={this.state.number}
                                        onChange={this.onChangeNumber}
                                    />
                                </div>               
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

export default AddPhone;
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

class AddNitur extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hint: '',
            message: ''
        };

        this.onChangeHint = this.onChangeHint.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Update Methods
    onChangeHint(e) {
        this.setState({
            hint: e.target.value
        });
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            hint: this.state.hint,
            message: this.state.message
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/niturs/add/', obj)
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
                    <ModalHeader toggle={this.toggle}> Add Nitur </ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div>
                            <div className="form-group element"  >
                                    <label>Message: </label>
                                    <textarea cols="50" rows="11" 
                                        style={{direction: "rtl", height:300}}
                                        required
                                        className="form-control"
                                        value={this.state.message}
                                        onChange={this.onChangeMessage}
                                    />
                                </div> 
                                <div className="form-group element"  >
                                    <label>Solution: </label>
                                    <textarea cols="50" rows="11" 
                                        style={{direction: "rtl", height:300}}
                                        required
                                        className="form-control"
                                        value={this.state.hint}
                                        onChange={this.onChangeHint}
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

export default AddNitur;
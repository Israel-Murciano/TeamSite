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

class AddSVM extends Component {
    constructor(props) {
        super(props);

        this.state = {
            svm_name: '',
        };

        this.onChangeName = this.onChangeName.bind(this);
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
            svm_name: e.target.value
        });
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            svm_name: this.state.svm_name,
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/svmlists/add/', obj)
            .then (
                    response => console.log("in axsios" +response.data)
                 );
        
        // Refresh the Page
        //window.location.reload(false);
    }

    render() {
        return (
            <div>
                <button className="btn-circle slideInUp" onClick={this.toggle}><i className="fa fa-plus"> </i> </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg">
                    <ModalHeader toggle={this.toggle}> Add SVM </ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div>
                                <div className="form-group element">
                                    <label>SVM: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="text"
                                        required
                                        className="form-control"
                                        value={this.state.svm_name}
                                        onChange={this.onChangeName}
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

export default AddSVM;
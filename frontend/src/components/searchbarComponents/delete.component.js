import React, { Component } from 'react';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';

class Delete extends Component {
    constructor(props) {
        super(props);

        this.state = {
              modal: false,
              backdrop: true,
              app: '',
        };

        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/delete/' + this.props.app)

        // Refresh the Page
        window.location.reload(false);
    }

    render() {
        return (
                <div className="fa fa-times" style={{color:"red"}} onClick={this.toggle}>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle}> Delete {this.props.app} </ModalHeader>
                        <ModalBody>
                            Are You Sure You Want to delete {this.props.app}? 
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onSubmit}> Yes </Button>
                            <Button color="secondary" onClick={this.toggle}> No </Button>
                        </ModalFooter>
                    </Modal>
                </div>
        )           
    }
}

export default Delete;
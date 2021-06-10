import React, { Component } from 'react';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';

class Boss extends Component {
    constructor(props) {
        super(props);

        this.state = {
              modal: false,
              backdrop: true,
              app: '',
              boss: '',
              phone: '',
        };

        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }




    render() {
        return (
            
                <div onClick={this.toggle}>
                <Button color="info">Boss</Button>
                    <Modal isOpen={this.state.modal}  toggle={this.toggle} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle}><h2><strong> {this.props.app} Description </strong></h2></ModalHeader>
                        <ModalBody>
                                <font color="blue" size="4">
                                    <strong>
                                        <div style={{direction: "rtl", textAlign: "right"}}>
                                            {this.props.boss}
                                        </div>
                                        <div style={{direction: "rtl", textAlign: "right"}}>
                                            {this.props.phone}
                                        </div>
                                    </strong>
                                </font>
                        </ModalBody>
                    </Modal>
                </div>
        )           
    }
}

export default Boss;
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
              newEvent: ''
        };

        this.app = this.app.bind(this);
        this.newEvent = this.newEvent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount () {
        console.log("what is: " + this.props.app)
        axios.get('http://' + node_host + ':' + node_port + '/api/specialEvent/' + this.props.app)
            .then(response => {
                
                this.setState({
                    app: response.data.app,
                    newEvent: response.data.newEvent
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
    newEvent(e) {
        this.setState({
            newEvent: e.target.value
        });
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            newEvent: this.state.newEvent,
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/updateSpecialEvent/' + this.props.app, obj)
        // Refresh the Page
        window.location.reload(false);
    }

    delete(e) {
        e.preventDefault();
        const obj = {
            newEvent: 'deleteMe'
        }
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/updateSpecialEvent/' + this.props.app, obj)
        // Refresh the Page
        window.location.reload(false);
       
    }

    render() {
        return (
                <div className="fa fa-pencil-alt" onClick={this.toggle}>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle}> {this.state.newEvent} </ModalHeader>
                        <ModalBody>
                            <div>
                                <label> Event: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.newEvent}
                                        onChange={this.newEvent}
                                />
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="red" onClick={this.delete}> Delete </Button>
                            <Button color="primary" onClick={this.onSubmit}> Save </Button>
                            <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                        </ModalFooter>
                    </Modal>
                </div>

        )
                
    }
}

export default Edit;
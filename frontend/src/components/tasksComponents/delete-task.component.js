import React, {Component} from "react"
import axios from 'axios';
import {node_host,node_port} from '../../config';
import "../../css/table.css";
import "../../css/button.css";
import "../../css/modal.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';

class DeleteTask extends Component{
    constructor (props){
        super(props);
        this.state = {
            modal: false,
            backdrop: true,
        }

            this.toggle = this.toggle.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }

    toggle() {
        //Fetches data again in order to get reliable information, fixes the "Wrong infromation after search" BUG
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
        
        console.log(this.props.taskId)

        // Updates the data in the mongo
        axios.delete('http://' + node_host + ':' + node_port + '/api/tasks/'+this.props.taskId)
            .then(res => console.log(res.data));
            window.location.reload(false);

        // Refresh the Page
        window.location.reload(false);
    }

    render() {
        return (
                <div >
                    <button class="btn" style={{boxShadow:"none",position:"absolute",top:'665px',right:'450px',fontSize:"1rem"}} onClick={this.toggle}>
                        <i className="fa fa-trash-alt fa-lg"></i>
                    </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle} style={{color:"rgb(66, 133, 244)"}}>Deleting Task</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this Task? 
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
    
export default DeleteTask;
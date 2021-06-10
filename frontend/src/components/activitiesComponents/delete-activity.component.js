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

class DeleteActivity extends Component{
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
        axios.get('http://' + node_host + ':' + node_port + '/api/activities/' + this.props.activityId)
            .then( res => {
                    this.setState({
                        activityTitle:res.data.activityTitle,
                        description:res.data.description,
                        activityStartDate:res.data.activityStartDate,
                        activityEndDate:res.data.activityEndDate,
                        team:res.data.team 
                    })
            })

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
        axios.delete('http://' + node_host + ':' + node_port + '/api/activities/delete/' + this.props.activityId)
        
        // Refresh the Page
        window.location.reload(false);
    }

    render() {
        return (
                <div >
                    <button class="btn" style={{boxShadow:"none",position:"absolute",top:'-5px',right:'-25px',fontSize:"1rem"}} onClick={this.toggle}>
                        <i className="fas fa-trash-alt fa-lg"></i>
                    </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}>
                        <ModalHeader toggle={this.toggle} style={{color:"rgb(66, 133, 244)"}}>Deleting an Activity</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this activity? 
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
    
export default DeleteActivity;
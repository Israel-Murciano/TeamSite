import React, { Component } from 'react';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import "../../css/div.css"
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
import { whatRole } from "../../utils/rolesCheck";

class EditNitur extends Component {
    constructor(props) {
        super(props);

        this.deleteNitur = this.deleteNitur.bind(this);

        this.state = {
            hint: '',
            message: '',
            modal: props.modal
        };

        this.onChangeHint = this.onChangeHint.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    toggle() {
        console.log("id2:"+this.props.niturid)
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }    

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/niturs/'+this.props.niturid)
            .then(Response => {
                this.setState({
                    hint: Response.data.hint,
                    message: Response.data.message
                })
            })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeHint (e) {
        this.setState({
            hint: e.target.value
        });
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    closeWindow() {
        window.location.reload(false)
    }

    deleteNitur(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/niturs/'+this.props.niturid)
            .then(res => console.log(res.data));
            window.location.reload(false);
    }

    onSubmit(e) {
        e.preventDefault();

        const nitur = {
            hint: this.state.hint,
            message: this.state.message
        }

        axios.post('http://' + node_host + ':' + node_port + '/api/niturs/update/'+this.props.niturid, nitur)
            .then(res => console.log(res.data));

        window.location = '/TeamSite/nitur';
    }



    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="md" onClosed={this.closeWindow}>
                    <ModalHeader toggle={this.toggle}> Edit Nitur </ModalHeader>
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
                        <Button color="primary" type="submit"> Save </Button>
                        <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                        {whatRole() > 2 &&<Button color="red" onClick={() => { if(window.confirm('Are you SURE you want to delete this nitur?'))this.deleteNitur(this.props.niturid)}}><i class="fa fa-trash-alt" style={{color:"white"}}></i></Button>}
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default EditNitur;

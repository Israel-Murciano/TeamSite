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

class EditPhone extends Component {
    constructor(props) {
        super(props);

        this.deletePhone = this.deletePhone.bind(this);

        this.state = {
            name: '',
            number: '',
            modal: props.modal
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    toggle() {
        console.log("id2:"+this.props.phoneid)
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }    

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/phones/'+this.props.phoneid)
            .then(Response => {
                this.setState({
                    name: Response.data.name,
                    number: Response.data.number
                })
            })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeName (e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        });
    }

    closeWindow() {
        window.location.reload(false)
    }

    deletePhone(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/phones/'+this.props.phoneid)
            .then(res => console.log(res.data));
            window.location.reload(false);
    }

    onSubmit(e) {
        e.preventDefault();

        const phone = {
            name: this.state.name,
            number: this.state.number
        }

        axios.post('http://' + node_host + ':' + node_port + '/api/phones/update/'+this.props.phoneid, phone)
            .then(res => console.log(res.data));

        window.location = '/TeamSite/phones';
    }



    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="md" onClosed={this.closeWindow}>
                    <ModalHeader toggle={this.toggle}> Edit Phone </ModalHeader>
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
                        <Button color="primary" type="submit"> Save </Button>
                        <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                        {whatRole() > 2 &&<Button color="red" onClick={() => { if(window.confirm('Are you SURE you want to delete this phone?'))this.deletePhone(this.props.phoneid)}}><i class="fa fa-trash-alt" style={{color:"white"}}></i></Button>}
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default EditPhone;

import React, { Component } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';



class AddPass extends Component {
    constructor(props) {
        super(props);

        this.state = {
              modal: false,
              backdrop: true,
              component: '',
              username: '',
              password: ''
        };

        this.onChangeComponent = this.onChangeComponent.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onToggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    // Update Methods
    onChangeComponent(e) {
        console.log("vomponrn");
        this.setState({
            component: e.target.value
        });
    }
    onChangeUsername(e) {
        console.log("user");
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        console.log("pass");
        this.setState({
            password: e.target.value
        });
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            component: this.state.component,
            username: this.state.username,
            password: this.state.password,
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        
        // Updates the data in the mongo
        axios.post('http://localhost:5000/api/passwords/add/', obj)
            .then (
                    response => console.log("in axios" +response.data)
                 );
        
        // Refresh the Page
        window.location.reload(false);
    }

    render() {
        return (
                <div>
                    <button className="btn-circle slideInUp" onClick={this.onToggle}>
                        <i className="fa fa-plus"> </i>
                    </button>
                    <Modal isOpen={this.state.modal} toggle={this.onToggle} backdrop={this.state.backdrop} >
                        <ModalHeader toggle={this.onToggle}> Adding a password </ModalHeader>
                        <form onSubmit={this.onSubmit}>
                            <ModalBody>
                                    <div>
                                        <label style={{paddingTop: '1px'}}> Component: </label>
                                        <input  type="text"
                                                className="form-control"
                                                value={this.state.component}
                                                onChange={this.onChangeComponent}
                                                required
                                        />
                                    </div>
                                    <div>
                                        <label> Username: </label>
                                        <input  type="text"
                                                className="form-control"
                                                value={this.state.username}
                                                onChange={this.onChangeUsername}
                                                required
                                        />
                                    </div>
                                    <div>
                                        <label> Password: </label>
                                        <input  type="text"
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={this.onChangePassword}
                                                required
                                        />
                                    </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" type="submit"> Add </Button>
                                <Button color="secondary" onClick={this.onToggle}> Cancel </Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                </div>
        )
                
    }
}

export default AddPass;
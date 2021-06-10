import React, { Component } from 'react';
import axios, {post} from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import {node_host,node_port} from '../../config';
import "../../css/div.css"

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            humans: [],
            description: '',
            handler: '',
            story: '',
            status: '',
            startdate: '',
            enddate: '',
            priority: '',
            selectedFile: null,
        };

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeStory = this.onChangeStory.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeStartdate = this.onChangeStartdate.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeEnddate = this.onChangeEnddate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/humans/')
            .then(response => {
                this.setState({
                    humans: response.data,
                })
            })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onChangeUpload=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
        console.log(event.target.files[0])
    }

    // Update Methods
    onChangeSystem(e) {
        this.setState({
            system: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeHandler(e) {
        this.setState({
            handler: e.target.value
        });
    }

    onChangeStartdate(e) {
        this.setState({
            startdate: e.target.value
        });
    }

    onChangeStory(e) {
        this.setState({
            story: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangeEnddate(e) {
        this.setState({
            enddate: e.target.value
        });
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    // Save Button 
    onSubmit(e) {
        e.preventDefault();

        // For uploading the files
        const data = new FormData()
        data.append('file', this.state.selectedFile)


        const obj = {
            description: this.state.description,
            handler: this.state.handler,
            story: this.state.story,
            status: this.state.status,
            startdate: this.state.startdate,
            priority: this.state.priority,
            enddate: this.state.enddate,
        }

        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        axios.post('http://' + node_host + ':' + node_port + '/api/tasksUpload', data)
            .then (res => {
                console.log("Uploaded, " + res.statusText)
            });
        
        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/tasks/add/', obj)
            .then (
                    response => console.log("in axios" +response.data)
                 );
        
        // Refresh the Page
        window.location.reload(false);
    }

    humansList() {
        return this.state.humans.map(singleHuman => {
          return <option value={singleHuman.name}>{singleHuman.name}</option>;
        });
      }

    render() {
        return (
            <div>
                <button className="btn-circle slideInUp" onClick={this.toggle}><i className="fa fa-plus"> </i> </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg">
                    <ModalHeader toggle={this.toggle} style={{color: "rgb(0, 128, 200)"}}> Add Task </ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div  id="left">
                                <div className="form-group element"  >
                                    <label>Description: </label>
                                    <input 
                                        style={{direction: "rtl", width:770}}
                                        type="text"
                                        required
                                        className="form-control element"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>
                                <div className="form-group element"  >
                                    <label>Story: </label>
                                    <textarea cols="50" rows="11" 
                                        style={{direction: "rtl", height:180, width:770}}
                                        required
                                        className="form-control"
                                        value={this.state.story}
                                        onChange={this.onChangeStory}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Start Date: </label>
                                    <input 
                                        style={{direction: "rtl", width:770}}
                                        type="date"
                                        name="start-date"
                                        required
                                        className="form-control"
                                        value={this.state.startdate}
                                        onChange={this.onChangeStartdate}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Finito Date: </label>
                                    <input 
                                        style={{direction: "rtl", width:770}}
                                        type="date"
                                        name="end-date"
                                        className="form-control"
                                        value={this.state.enddate}
                                        onChange={this.onChangeEnddate}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Name: </label>
                                    <select style={{width:770}} className="form-control" onChange={this.onChangeHandler}>
                                    <option value=""></option>
                                    {this.humansList()}
                                    </select>
                                </div>
                            </div>
                            <div>
                            <div className="form-group" id="left-2" >
                                    <label>Priority: </label>
                                    <select style={{width:365}} className="form-control" onChange={this.onChangePriority}>
                                        <option value=""></option>
                                        <option value="1 - Highest" style={{backgroundColor: "red", color: "black"}}>Highest</option>
                                        <option value="2 - High" style={{backgroundColor: "orange", color: "black"}}>High</option>
                                        <option value="3 - Medium" style={{backgroundColor: "yellow", color: "black"}}>Medium</option>
                                        <option value="4 - Low" style={{backgroundColor: "rgba(68, 206, 117, 0.90)", color: "black"}}>Low</option>
                                    </select>
                                </div>
                                <div className="form-group" id="right-2" >
                                    <label>Status: </label>
                                    <select style={{width:360}} className="form-control" onChange={this.onChangeStatus}>
                                        <option value=""></option>
                                        <option value="Open" style={{backgroundColor: "red", color: "black"}}>Open</option>
                                        <option value="Closed" style={{backgroundColor: "rgba(68, 206, 117, 0.90)", color: "black"}}>Closed</option>
                                        <option value="On Hold" style={{backgroundColor: "yellow", color: "black"}}>On Hold</option>
                                    </select>
                                </div>
                            </div>
                                <ModalFooter style={{width:770}}>
                                    <Button color="primary" type="submit"> Add </Button>
                                    <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                                </ModalFooter>
                        </ModalBody>
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default AddTask;
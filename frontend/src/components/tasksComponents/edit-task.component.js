import React, { Component } from 'react';
import axios from 'axios';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {node_host,node_port} from '../../config';
import 'bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import "../../css/div.css"
import { whatRole } from "../../utils/rolesCheck";


class EditTask extends Component {
    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this);

        this.state = {
            humans: [],
            description: '',
            handler: '',
            story: '',
            status: '',
            startdate: '',
            enddate: '',
            priority: '',
            modal: props.modal
        };

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeStory = this.onChangeStory.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeStartdate = this.onChangeStartdate.bind(this);
        this.onChangeEnddate = this.onChangeEnddate.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }    

    closeWindow() {
        window.location.reload(false)
    }

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/tasks/'+this.props.taskid)
            .then(Response => {
                this.setState({
                    description: Response.data.description,
                    handler: Response.data.handler,
                    story: Response.data.story,
                    startdate: Response.data.startdate,
                    enddate: Response.data.enddate,
                    status: Response.data.status,
                    priority: Response.data.priority,
                })
            })
        axios.get('http://' + node_host + ':' + node_port + '/api/humans/')
        .then(response => {
            this.setState({
                humans: response.data,
            })
        })
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

    onChangeStory(e) {
        this.setState({
            story: e.target.value
        });
    }

    onChangeStartdate(e) {
        this.setState({
            startdate: e.target.value
        });
    }

    onChangeEnddate(e) {
        this.setState({
            enddate: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    deleteTask(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/tasks/'+id)
            .then(res => console.log(res.data));
            window.location.reload(false);
    }

    onSubmit(e) {
        e.preventDefault();

        const task = {
            description: this.state.description,
            handler: this.state.handler,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            story: this.state.story,
            status: this.state.status,
            priority: this.state.priority,
        }

        console.log(task)

        axios.post('http://' + node_host + ':' + node_port + '/api/tasks/update/'+this.props.taskid, task)
            .then(res => console.log(res.data));

        window.location = '/TeamSite/tasks';
    }

    humansList() {
        return this.state.humans.map(singleHuman => {
          return <option value={singleHuman.name}>{singleHuman.name}</option>;
        });
      }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg" onClosed={this.closeWindow}>
                    <ModalHeader toggle={this.toggle} style={{color: "rgb(0, 128, 200)"}}> Edit Task </ModalHeader>
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
                                        style={{direction: "rtl", height:200, width:770}}
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
                                    <option value="">{this.state.handler}</option>
                                    {this.humansList()}
                                    </select>
                                </div>
                            </div>
                            <div>
                            <div className="form-group" id="left-2" >
                                    <label>Priority: </label>
                                    <select style={{width:365}} className="form-control" onChange={this.onChangePriority}>
                                        <option value="">{this.state.priority}</option>
                                        <option value="1 - Highest" style={{backgroundColor: "red", color: "black"}}>Highest</option>
                                        <option value="2 - High" style={{backgroundColor: "orange", color: "black"}}>High</option>
                                        <option value="3 - Medium" style={{backgroundColor: "yellow", color: "black"}}>Medium</option>
                                        <option value="4 - Low" style={{backgroundColor: "rgba(68, 206, 117, 0.90)", color: "black"}}>Low</option>
                                    </select>
                                </div>
                                <div className="form-group" id="right-2" >
                                    <label>Status: </label>
                                    <select style={{width:360}} className="form-control" onChange={this.onChangeStatus}>
                                        <option value="">{this.state.status}</option>
                                        <option value="Open" style={{backgroundColor: "red", color: "black"}}>Open</option>
                                        <option value="Closed" style={{backgroundColor: "rgba(68, 206, 117, 0.90)", color: "black"}}>Closed</option>
                                        <option value="On Hold" style={{backgroundColor: "yellow", color: "black"}}>On Hold</option>
                                    </select>
                                </div>
                                <ModalFooter style={{width:770}}>
                                    <Button color="primary" type="submit"> Save </Button>
                                    <Button color="secondary" onClick={this.onToggle}> Cancel </Button>
                                    {whatRole() > 2 &&<Button color="red" onClick={() => { if(window.confirm('Are you SURE you want to delete this task?'))this.deleteTask(this.props.taskid)}}><i class="fa fa-trash-alt" style={{color:"white"}}></i></Button>}
                                </ModalFooter>
                            </div>
                        </ModalBody>
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default EditTask;
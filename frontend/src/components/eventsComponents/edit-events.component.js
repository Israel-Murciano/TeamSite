import React, { Component } from 'react';
import axios from 'axios';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {node_host,node_port} from '../../config';
import DeleteEvent from './delete-event.component';
import 'bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import "../../css/div.css"
import { whatRole } from "../../utils/rolesCheck";


class EditEvent extends Component {
    constructor(props) {
        super(props);

        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            system: '',
            domain: '',
            description: '',
            startdate: '',
            starttime: '',
            name: '',
            handler: '',
            story: '',
            effect: '',
            closedate: '',
            closetime: '',
            status: '',
            modal: props.modal
        };

        this.onChangeSystem = this.onChangeSystem.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartdate = this.onChangeStartdate.bind(this);
        this.onChangeStarttime = this.onChangeStarttime.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeStory = this.onChangeStory.bind(this);
        this.onChangeEffect = this.onChangeEffect.bind(this);
        this.onChangeClosedate = this.onChangeClosedate.bind(this);
        this.onChangeClosetime = this.onChangeClosetime.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
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

    deleteEvent(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/events/'+id)
            .then(res => console.log(res.data));

        this.setState({
            events: this.state.events.filter(el => el._id !== id)
        })
    }

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/events/'+this.props.eventid)
            .then(Response => {
                this.setState({
                    system: Response.data.system,
                    domain: Response.data.domain,
                    description: Response.data.description,
                    startdate: Response.data.startdate,
                    starttime: Response.data.starttime,
                    name: Response.data.name,
                    handler: Response.data.handler,
                    story: Response.data.story,
                    effect: Response.data.effect,
                    closedate: Response.data.closedate,
                    closetime: Response.data.closetime,
                    status: Response.data.status,
                    reportee: Response.data.reportee
                })
            })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeLayer(e) {
        this.setState({
            layer: e.target.value
        });
    }

    onChangeSystem(e) {
        this.setState({
            system: e.target.value
        });
    }

    onChangeDomain(e) {
        this.setState({
            domain: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeStartdate(e) {
        this.setState({
            startdate: e.target.value
        });
    }

    onChangeStarttime(e) {
        this.setState({
            starttime: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
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

    onChangeEffect(e) {
        this.setState({
            effect: e.target.value
        });
    }

    onChangeClosedate(e) {
        this.setState({
            closedate: e.target.value
        });
    }

    onChangeClosetime(e) {
        this.setState({
            closetime: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangeReportee(e) {
        this.setState({
            reportee: e.target.value
        });
    }

    deleteEvent(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/events/'+id)
            .then(res => console.log(res.data));
            window.location.reload(false);
    }

    onSubmit(e) {
        e.preventDefault();

        const event = {
            type: this.state.type,
            layer: this.state.layer,
            system: this.state.system,
            domain: this.state.domain,
            description: this.state.description,
            startdate: this.state.startdate,
            starttime: this.state.starttime,
            name: this.state.name,
            handler: this.state.handler,
            story: this.state.story,
            effect: this.state.effect,
            closedate: this.state.closedate,
            closetime: this.state.closetime,
            status: this.state.status,
            reportee: this.state.reportee
        }

        console.log(event)

        axios.post('http://' + node_host + ':' + node_port + '/api/events/update/'+this.props.eventid, event)
            .then(res => console.log(res.data));

        window.location = '/TeamSite/events';
    }



    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" onClosed={this.closeWindow}>
                    <ModalHeader toggle={this.toggle} style={{color: "rgb(0, 128, 200)"}}> Edit Event </ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div  id="left">
                                <div className="form-group element"  >
                                    <label>Description: </label>
                                    <input 
                                        style={{direction: "rtl"}}
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
                                        style={{direction: "rtl", height:390}}
                                        required
                                        className="form-control"
                                        value={this.state.story}
                                        onChange={this.onChangeStory}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Assignee: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="text"
                                        required
                                        className="form-control"
                                        value={this.state.handler}
                                        onChange={this.onChangeHandler}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Status: </label>
                                    <select style={{direction: "rtl"}} className="form-control" onChange={this.onChangeStatus}>
                                        <option value="">{this.state.status}</option>
                                        <option value="פתוח" style={{backgroundColor: "red", color: "white"}}>פתוח</option>
                                        <option value="סגור" style={{backgroundColor: "green", color: "white"}}>סגור</option>
                                    </select>
                                </div>
                            </div>

                            <div id="right">
                                <div className="form-group"  >
                                    <label>System: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="text"
                                        className="form-control"
                                        value={this.state.system}
                                        onChange={this.onChangeSystem}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Environment: </label>
                                    <select style={{direction: "rtl"}} className="form-control" onChange={this.onChangeDomain}>
                                        <option value="">{this.state.domain}</option>
                                        <option value="ממר&quot;ם">ממר"ם</option>
                                        <option value="מרגנית">מרגנית</option>
                                        <option value="ממר&quot;ם ומרגנית">ממר"ם ומרגנית</option>
                                        <option value="TNG ממר&quot;ם">TNG ממר"ם</option>
                                        <option value="מרגנית">TNG מרגנית</option>
                                        <option value="TNG ממר&quot;ם ומרגנית">TNG ממר"ם ומרגנית</option>
                                    </select>
                                </div>                    
                                <div className="form-group"  >
                                    <label>Start Date: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="date"
                                        name="start-date"
                                        required
                                        className="form-control"
                                        value={this.state.startdate}
                                        onChange={this.onChangeStartdate}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Start Time: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="time"
                                        name="start-time"
                                        required
                                        className="form-control"
                                        value={this.state.starttime}
                                        onChange={this.onChangeStarttime}
                                    />
                                </div>
                                <div className="form-group"  >
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
                                <div className="form-group"  >
                                    <label>Effect: </label>
                                    <select style={{direction: "rtl"}} className="form-control" onChange={this.onChangeEffect}>
                                        <option value="">{this.state.effect}</option>
                                        <option value="השבתה">השבתה</option>
                                        <option value="השבתה חלקית">השבתה חלקית</option>
                                        <option value="ירידה בשרידות">ירידה בשרידות</option>
                                        <option value="חוסר בגיבוי">חוסר בגיבוי</option>
                                    </select>
                                </div>
                                <div className="form-group"  >
                                    <label>Close Date: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="date"
                                        name="close-date"
                                        className="form-control"
                                        value={this.state.closedate}
                                        onChange={this.onChangeClosedate}
                                    />
                                </div>
                                <div className="form-group"  >
                                    <label>Close Time: </label>
                                    <input 
                                        style={{direction: "rtl"}}
                                        type="time"
                                        name="start-time"
                                        className="form-control"
                                        value={this.state.closetime}
                                        onChange={this.onChangeClosetime}
                                    />
                                </div>          
                            </div>
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit"> Save <i class="fa fa-save" style={{color:"#ZZZZZZ"}}></i></Button>
                        <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                        {whatRole() > 2 &&<Button color="red" onClick={() => {if(window.confirm('Are you SURE you want to delete this event?'))this.deleteEvent(this.props.eventid)}}><i class="fa fa-trash-alt" style={{color:"white"}}></i></Button>}
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default EditEvent;
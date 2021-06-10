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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class EditActivity extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            backdrop: true,
            activityTitle:'',
            description:'',
            activityStartDate:'',
            activityEndDate:'',
            status:'',
            team:''
        }
        this.activityTitle = this.activityTitle.bind(this);
        this.description = this.description.bind(this);
        this.toggle = this.toggle.bind(this);
        this.team = this.team.bind(this);
        this.status = this.status.bind(this);
        this.onChangeActivityStartDate = this.onChangeActivityStartDate.bind(this);
        this.onChangeActivityEndDate = this.onChangeActivityEndDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    toggle(){
        //Fetches data again in order to get reliable information, fixes the "Wrong infromation after search" BUG
        this.setState(prevState =>({
            modal:!prevState.modal
        }));
    }

    //Fetches data of chosen activity
    componentDidMount(){
        axios.get('http://' + node_host + ':' + node_port + '/api/activities/' + this.props.activityId)
            .then( res => {
                    this.setState({
                        activityTitle:res.data.activityTitle,
                        description:res.data.description,
                        activityStartDate: "",
                        activityEndDate: "",
                        status: "",
                        team:res.data.team 
                    })
            })
    }

    //Update Methods
    activityTitle(e){
        this.setState(
            {activityTitle:e.target.value}
        )
    }
    description(e){
        this.setState(
            {description:e.target.value}
        )
    }
    team(e){
        this.setState(
            {team:e.target.value}
        )
    }
    status(e){
        this.setState(
            {status:e.target.value}
        )
    }
    onChangeActivityStartDate(date){
        this.setState(
            {activityStartDate:date}
        )
    }
    onChangeActivityEndDate(date){
        this.setState(
            {activityEndDate:date}
        )
    }

    // Save Button
    onSubmit(e){
        e.preventDefault();
        const newActivity = {
            activityTitle:this.state.activityTitle,
            description:this.state.description,
            activityStartDate:this.state.activityStartDate,
            activityEndDate:this.state.activityEndDate,
            team:this.state.team,
            status:this.state.status
        }
        
        //Closes pop-up window
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        // Updates the data in the mongo
        axios.post('http://' + node_host + ':' + node_port + '/api/activities/update/' + this.props.activityId, newActivity)
        
        // Refresh the Page
        window.location.reload(false);
    }
    
    render(){  
        return(
            <div>
                <button class="btn" style={{boxShadow:"none",position:"absolute",top:'-5px',left:'-25px',fontSize:"1rem"}} onClick={this.toggle}>
                    <i className="fas fa-edit fa-lg"></i>
                </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} >
                        <ModalHeader toggle={this.toggle} style={{color:"rgb(66, 133, 244)"}} > Editing an Activity </ModalHeader>
                        <form onSubmit={this.onSubmit}>
                            <ModalBody>
                                <div>
                                    <label style={{paddingTop: '1px'}}> Team InCharge: </label>
                                    <input  type="text"
                                            required
                                            style={{direction: "rtl"}}
                                            className="form-control"
                                            value={this.state.team}
                                            onChange={this.team}
                                    />
                                    <label style={{paddingTop: '1px'}}> Activity Title: </label>
                                    <input  type="text"
                                            required
                                            style={{direction: "rtl"}}
                                            className="form-control"
                                            value={this.state.activityTitle}
                                            onChange={this.activityTitle}       
                                    />
                                    <label style={{paddingTop: '1px'}}> Description: </label>
                                    <textarea  
                                            type="text"
                                            required
                                            style={{direction: "rtl",height:"75px"}}
                                            className="form-control"
                                            value={this.state.description}
                                            onChange={this.description}
                                    />
                                    <label style={{paddingTop: '1px'}}> Status: </label>
                                    <select style={{direction: "rtl"}} className="form-control" onChange={this.status}>
                                        <option value=""></option>
                                        <option value="Nope" style={{backgroundColor: "red", color: "white"}}>Nope</option>
                                        <option value="Yea" style={{backgroundColor: "green", color: "white"}}>Yea</option>
                                    </select>
                                    <label>Start Date:</label><br></br>
                                    < DatePicker dateFormat="dd/MM/yyyy"
                                                selected={this.state.activityStartDate}
                                                onChange={ date => this.onChangeActivityStartDate(date)}
                                                maxDate={this.state.activityEndDate}
                                                required
                                    />
                                    <br></br>
                                    <label>End Date:</label><br></br>
                                    <DatePicker dateFormat="dd/MM/yyyy"
                                                selected={this.state.activityEndDate}
                                                onChange={date => this.onChangeActivityEndDate(date)}
                                                minDate={this.state.activityStartDate} 
                                                required           
                                    />
                                </div>                                
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" type="submit"> Save </Button>
                                <Button color="secondary" onClick={this.toggle}> Cancel </Button>
                            </ModalFooter>
                        </form>
                </Modal>
            </div>
        )
    }
}

export default EditActivity;
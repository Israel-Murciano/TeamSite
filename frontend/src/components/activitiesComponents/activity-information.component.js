
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
import moment from 'moment';

class ActivityInformation extends Component{
    constructor(props){
        super(props)
        this.state = {
            modal:false,
            backdrop: true,
            /*activityTitle:'',
            description:'',
            activityStartDate:'',
            activityEndDate:'',
            team:'',*/
            data: ''

        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
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

        this.setState(prevState =>({
            modal:!prevState.modal
        }));
    }

    //Fetches data of chosen activity
    componentDidMount(){
        axios.get('http://' + node_host + ':' + node_port + '/api/activities/' + this.props.activityId)
            .then( res => {
                    this.setState({
                        data: res.data
                    })
                    console.log(this.state.data)
            })
        console.log(this.state.data)
    }

    render(){
        return(
            <div>
                <button className="btn btn-gradient" style={{fontSize:"13px"}} onClick={this.toggle}>Read More</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}>
                            <ModalBody style={{direction: "rtl",'textAlign':"center"}}>
                            <h2 style={{color:"rgb(66, 133, 244)"}}>
                                {this.state.data.activityTitle}
                            </h2> 
                            <p>{this.state.data.description}</p>

                            <p>צוות מבצע: {this.state.data.team}</p>
                            <p style={{direction: "ltr"}}>{moment(this.state.activityStartDate).format("D/MM/yyyy") + '  -  ' + moment(this.state.activityEndDate).format('D/MM/yyyy')}</p>
                            </ModalBody>
                </Modal>
            </div>
        )
    }

}

export default ActivityInformation;
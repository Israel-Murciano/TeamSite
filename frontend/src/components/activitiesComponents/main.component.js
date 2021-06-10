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
import AddActivity from '../activitiesComponents/add-activity.component';
import DeleteActivity from '../activitiesComponents/delete-activity.component'
import EditActivity from '../activitiesComponents/edit-activity.component'
import { whatRole } from "../../utils/rolesCheck";
import LinesEllipsis from 'react-lines-ellipsis'
import ActivityInformation from "./activity-information.component";
import moment from 'moment';

class ActivityList extends Component{
    constructor(){
        super();
        this.state = {
            activities:[],
            searchQuery:""
        } 

    };

    componentDidMount(){
        axios.get('http://' + node_host + ':' + node_port + '/api/activities')
        .then( res => {
            this.setState({activities: res.data})
        })  
    }

    createBody(){
        //Styling shit
        var card_text = {'color': 'white','fontSize':'1.25rem',height:'125px','fontStyle':'italic',direction: "rtl"}
        var card_title = {'color': 'white','fontSize':'1.9rem',height:'85px','fontStyle':'bold',direction: "rtl"}
        var card_header = {paddingRight:'45px',paddingLeft:'45px',height:'25px',direction: "rtl"}
        var cardColors = [' card text-white bg-primary','card text-white bg-info']
        var colorIndex = 0  
        var actUIArr = ""

        return actUIArr =  this.state.activities.map( activity => {  
            if (colorIndex > 1)
            {
                colorIndex = 0
            } 
            var body = (<div class="mx-5">
                            <div class="my-5 animated fadeIn">
                                <div class={cardColors[colorIndex]} style={{maxWidth: '18rem', height:'500px'}}>
                                    <div class="card-header align-item-center">
                                        <LinesEllipsis
                                            text={activity.team}
                                            style={card_header}
                                            maxLine='1'
                                            ellipsis='...'
                                            trimRight='true'
                                            basedOn="letters"
                                        />
                                        {whatRole() > 1 && <DeleteActivity activityId={activity._id}/>}
                                        {whatRole() > 1 && <EditActivity activityId={activity._id}/>}
                                    </div>
                                    <div class="card-body">
                                        <LinesEllipsis
                                            class='card-title'
                                            text={activity.activityTitle}
                                            style={card_title}
                                            maxLine='2'
                                            ellipsis='...'
                                            trimRight='true'
                                            basedOn="letters"
                                        />
                                        <LinesEllipsis
                                            class='card-text'
                                            text={activity.description}
                                            style={card_text}
                                            maxLine='4'
                                            ellipsis='...'
                                            trimRight='true'
                                            basedOn="letters"
                                        />
                                        <ActivityInformation activityId={activity._id}/>
                                        <div style={{color: activity.status === "Yea" ? 'rgba(86, 211, 131, 1)':'red'}}>
                                            Succses: {activity.status}
                                        </div>
                                    </div>
                                    <div class="card-footer">{moment(activity.activityStartDate).format("D/MM/yyyy") + '  -  ' + moment(activity.activityEndDate).format('D/MM/yyyy')} </div>
                                </div>
                            </div>
                        </div>)
            colorIndex = colorIndex + 1
            return body 
        })   
    }
    
    render () {
        return(
            <div>
                <h1 style={{ margin: "25px" }}> <i className="fas fa-snowboarding mr-3 blue-text"> </i> Activities </h1>
                {whatRole() > 1 && <AddActivity />}
                <div class="row">
                    {this.createBody()}
                </div>
            </div>
        )
    }
}

export default ActivityList;
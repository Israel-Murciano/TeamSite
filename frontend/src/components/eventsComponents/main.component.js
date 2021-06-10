//This componenet creates a table of all the events in the "events" db in MongoDB.

//Importing 
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import matchSorter, {rankings, caseRankings} from "match-sorter";
import ReactTable from "react-table";
import DeleteEvent from './delete-event.component';

//Importing self-made components/config files.
import AddEvent from './add-event.component';
import EditEvent from './edit-events.component';
import {node_host,node_port} from '../../config';

//Importing .css.
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../../css/table.css";
import "../../css/button.css";
import "../../css/modal.css";

//
export default class EventList extends Component {
    constructor(props) {
        super(props);

        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {events: [1]};
    }
    
    //
    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/events/')
            .then(response => {
                this.setState({ events: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Here we configure the delete request for a specific item.
    deleteEvent(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/events/'+id)
            .then(res => console.log(res.data));

        this.setState({
            events: this.state.events.filter(el => el._id !== id)
        })
    }

    //This part will change the color of the row based on the "status" cell.
    getTrProps = (state, rowInfo, instance) => {
        if (rowInfo) {
            return {
                style: {
                    background: rowInfo.row.status === "סגור" ? 'rgba(68, 206, 117, 0.90)' : 'rgba(239, 61, 61, 0.90)',
                    color: 'black'
                }
            }
        }
        return {};

    }

    //
    render() {

        const reload=()=>window.location.reload(false);
        //Here i created the columns and gave them propertis/rules.
        const columns = [
            {
                Header: "Status",
                accessor: "status",
                width: 75,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value, { keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key: "status" }]}),
                filterAll: true
            },
            {
                Header: "Close Date",
                accessor: "closedate",
                sortable: false,
                Cell: props => 
                    <Fragment>
                        <span className='1'>{props.original.closedate} </span>
                        <span className='2'>{props.original.closetime}</span>
                    </Fragment>,
                width: 200
            },
            {
                Header: "Start Date",
                accessor: "startdate",
                sortable: false,
                Cell: props => 
                    <Fragment>
                        <span className='3'>{props.original.startdate} </span>
                        <span className='4'>{props.original.starttime}</span>
                    </Fragment>,
                width: 200
            },
            {
                Header: "Description",
                accessor: "description",
                sortable: false,
                Cell: props => 
                    <Fragment>
                        <span className='3'>{props.original.description}</span>
                        <small><p><span className='4'>{props.original.story}</span></p></small>
                    </Fragment>,
                width: 920,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "description" ]}]}),
                filterAll: true
            },
            {
                Header: "System",
                accessor: "system",
                sortable: false,
                width: 125,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "system" ] }]}),
                filterAll: true
            },
        ]

        //This is the part that will actually show up for the user.
        return (
            <div>
                <h1>
                    <i className="far fa-calendar-alt mr-3 blue-text" aria-hidden="true"/>
                    <strong>Mivzai Events</strong>
                </h1>
                <ReactTable
                    columns={columns}
                    nextText={<i class="fas fa-arrow-left"></i>}
                    previousText={<i class="fas fa-arrow-right"></i>}
                    data={this.state.events}
                    filterable
                    resizable={false}
                    getTrProps = {this.getTrProps}
                    defaultPageSize= {10}
                    noDataText = {<i class="fas fa-hand-middle-finger"></i>}
                    defaultSorted={[
                        {
                            id: "#",
                            desc: true
                        }
                    ]}
                    style={{direction: "rtl"}}
                    SubComponent={ props => {
                            return(
                                <a><EditEvent eventid = {props.original._id} modal={true} /></a>
                            )
                        }
                    }
                >
                </ReactTable>
                <AddEvent />
            </div>
        )
    }
}
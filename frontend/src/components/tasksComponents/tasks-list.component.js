//This componenet creates a table of all the events in the "events" db in MongoDB.

//Importing 
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import matchSorter, {rankings, caseRankings} from "match-sorter";
import ReactTable from "react-table";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TimeAgo from 'react-timeago';
import moment from 'moment';

//Importing self-made components/config files.
import AddTask from './add-task.component';
import EditTask from './edit-task.component';
import {node_host,node_port} from '../../config';
import DeleteTask from './delete-task.component';

//Importing .css.
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../../css/tasks-table.css";
import "../../css/button.css";
import "../../css/modal.css";
import 'react-tabs/style/react-tabs.css';


export default class TasksList extends Component {

    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this);

        this.state = {
            tasks: [1],
            humans: [],
        };
    }
    
    //

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/tasks/')
            .then(response => {
                this.setState({ tasks: response.data })
            })
        axios.get('http://' + node_host + ':' + node_port + '/api/humans/')
        .then(response => {
            this.setState({
                humans: response.data,
            })
        })
    }

    //Here we configure the delete request for a specific item.
    deleteTask(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/tasks/'+id)
            .then(res => console.log(res.data));
    }

    humansList() {
        return this.state.humans.map(singleHuman => {
          return <Tab style={{color: "rgb(0, 128, 200)"}}>{singleHuman.name}</Tab>;
        });
      }

    humansTab() {
        const columns = [
            {
                Header: "Status",
                accessor: "status",
                width: 100,
                Filter: ({filter, onChange}) => 
                <select onChange={event => onChange(event.target.value)} style={{width: "90px"}} value={filter ? filter.value: "all"}>
                    <option value="">All</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="On Hold">On Hold</option>
                </select>,
                filterMethod: (filter, row) => 
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "status" ]}]}),
                filterAll: true,
                filterable: true,
                getProps: (state, rowInfo, instance) => {
                    if (rowInfo) {
                        if (rowInfo.row.status == "Open"){
                            return {
                                style: {
                                    backgroundColor: 'red',
                                }
                            }
                        }
                        if (rowInfo.row.status == "Closed"){
                            return {
                                style: {
                                    backgroundColor: "rgba(68, 206, 117, 0.90)",
                                }
                            }
                        }
                        if (rowInfo.row.status == "On Hold"){
                            return {
                                style: {
                                    backgroundColor: 'yellow',
                                }
                            }
                        }
                    }
                    return {};
                }
            },
            {
                Header: "Finito Date",
                accessor: "enddate",
                Cell: props => 
                    <Fragment>
                        <span className='3'>{moment(props.original.enddate).format("DD/MM/YYYY")} </span>
                        <span className='4'>{props.original.endtime}</span>
                    </Fragment>,
                width: 100
            },
            {
                Header: "Start Date",
                accessor: "startdate",
                Cell: props => 
                    <Fragment>
                        <span className='3'>{moment(props.original.startdate).format("DD/MM/YYYY")} </span>
                        <span className='4'>{props.original.starttime}</span>
                    </Fragment>,
                width: 100
            },
            {
                Header: "Description",
                accessor: "description",
                sortable: false,
                filterable: true,
                width: 585,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "description" ]}]}),
                filterAll: true
            },
            {
                Header: "Priority",
                accessor: "priority",
                style: {direction: "ltr"},
                sortable: true,
                width: 100,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "handler" ]}]}),
                filterAll: true,
                getProps: (state, rowInfo, instance) => {
                    if (rowInfo) {
                        if (rowInfo.row.priority == "1 - Highest"){
                            return {
                                style: {
                                    color: 'red',
                                }
                            }
                        }
                        if (rowInfo.row.priority == "2 - High"){
                            return {
                                style: {
                                    color: 'orange',
                                }
                            }
                        }
                        if (rowInfo.row.priority == "3 - Medium"){
                            return {
                                style: {
                                    color: 'blue',
                                }
                            }
                        }
                        if (rowInfo.row.priority == "4 - Low"){
                            return {
                                style: {
                                    color:  "rgba(68, 206, 117, 0.90)",
                                }
                            }
                        } 
                    }
                    return {};
                }
            },
            {
                Header: "Name",
                accessor: "handler",
                sortable: true,
                width: 0,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "handler" ]}]}),
                filterAll: true
            },
        ]

        return this.state.humans.map(singleHuman => {
            return (
                <TabPanel>
                    <ReactTable 
                    className="tasks" 
                    columns={columns} 
                    data={this.state.tasks} 
                    defaultPageSize= {14} 
                    defaultFiltered={[{id: 'handler', value: singleHuman.name,},]} 
                    style={{direction: "rtl", position: "left"}}
                    SubComponent={ props => {
                        return(
                            <a><EditTask taskid = {props.original._id} modal={true} /></a>
                        )
                    }
                    } 
                    showPagination={true}>
                    </ReactTable>
                </TabPanel>)
    });
    }

    /*//This part will change the color of the row based on the "status" cell.
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

    }*/

    //
    render() {

        //Here i created the columns and gave them propertis/rules.
        const columns = [
            {
                Header: "Status",
                accessor: "status",
                width: 75,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value, { keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key: "status" }]}),
                filterAll: true,
                getProps: (state, rowInfo, instance) => {
                    if (rowInfo) {
                        return {
                            style: {
                                backgroundColor: rowInfo.row.status === "סגור" ? 'rgba(68, 206, 117, 0.90)' : 'rgba(239, 61, 61, 0.90)',
                            }
                        }
                    }
                    return {};
            
                }
            },
            {
                Header: "Deadline",
                accessor: "enddate",
                Cell: props => 
                    <Fragment>
                        <span className='3'>{moment(props.original.enddate).format("DD/MM/YYYY")} </span>
                    </Fragment>,
                width: 100
            },
            {
                Header: "Start Date",
                accessor: "startdate",
                Cell: props => 
                    <Fragment>
                        <span className='3'>{moment(props.original.startdate).format("DD/MM/YYYY")} </span>
                        <span className='4'>{props.original.starttime}</span>
                    </Fragment>,
                width: 100
            },
            {
                Header: "Description",
                accessor: "description",
                sortable: false,
                width: 470,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "description" ]}]}),
                filterAll: true
            },
            {
                Header: "Name",
                accessor: "handler",
                sortable: true,
                width: 100,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "handler" ]}]}),
                filterAll: true
            },
            {
                Header: "Priority",
                accessor: "priority",
                style: {direction: "ltr"},
                sortable: true,
                width: 100,
                filterMethod: (filter, row) =>
                    matchSorter(row, filter.value,{ keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "handler" ]}]}),
                filterAll: true,
                getProps: (state, rowInfo, instance) => {
                    if (rowInfo) {
                        if (rowInfo.row.priority == "1 - Highest"){
                            return {
                                style: {
                                    color: 'red',
                                }
                            }
                        }
                        if (rowInfo.row.priority == "2 - High"){
                            return {
                                style: {
                                    color: 'orange',
                                }
                            }
                        }
                        if (rowInfo.row.priority == "3 - Medium"){
                            return {
                                style: {
                                    color: 'blue',
                                }
                            }
                        }
                        if (rowInfo.row.priority == "4 - Low"){
                            return {
                                style: {
                                    color:  "rgba(68, 206, 117, 0.90)",
                                }
                            }
                        } 
                    }
                    return {};
                }
            },
        ]

        //This is the part that will actually show up for the user.
        return (
            <div>
                <h1>
                    <i className="fas fa-tasks mr-3 blue-text" aria-hidden="true"/>
                    <strong>Mivzai Tasks</strong>
                </h1>
                <Tabs>
                    <TabList>
                        <h7>
                            <Tab style={{color: "rgb(0, 128, 200)"}}>Open</Tab>
                            {this.humansList()}
                        </h7>
                    </TabList>

                    <TabPanel>
                        <ReactTable className="tasks"
                        columns={columns}
                        data={this.state.tasks}
                        defaultPageSize= {15}
                        resizable={false}
                        defaultFiltered={[
                            {
                                id: 'status',
                                value: 'Open',
                            },
                        ]}
                        style={{direction: "rtl"}}
                        showPagination={true}
                        SubComponent={ props => {
                            return(
                                <a><EditTask taskid = {props.original._id} modal={true} /></a>
                            )
                        }
                        }
                        >
                        </ReactTable>
                    </TabPanel>
                    {this.humansTab()}
                </Tabs>
                <AddTask />
            </div>
        )
    }
}
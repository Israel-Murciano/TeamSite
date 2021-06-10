import React, { Component } from 'react';
import axios from 'axios';
import AddNitur from './add-nitur.component';
import EditNitur from './edit-nitur.component';
import {node_host,node_port} from '../../config';
import ReactTable from "react-table";
import "../../css/nitur-table.css";
import "../../css/button.css";
import "../../css/modal.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import matchSorter from "match-sorter";

export default class NiturList extends Component {
    constructor(props) {
        super(props);

        this.deleteNitur = this.deleteNitur.bind(this);

        this.state = {nitur: [1]};
    }
    
    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/niturs/')
            .then(response => {
                this.setState({ nitur: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteNitur(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/niturs/'+id)
            .then(res => console.log(res.data));

        this.setState({
            nitur: this.state.nitur.filter(el => el._id !== id)
        })
    }

    render() {
        const columns = [
            {
                Header: "Message",
                accessor: "message",
                width: 400,
                sortable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "message" ] }]}),
                filterAll: true
            },
            {
                Header: "Solution",
                accessor: "hint",
                width: 320,
                sortable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "hint" ] }]}),
                filterAll: true
            }

        ]
        return (
            <div>
                <h1>
                    <i className="fas fa-eye mr-3 blue-text" aria-hidden="true"/>
                    <strong>Nitur Solutions</strong>
                </h1>
                <ReactTable className="tablephone"
                    columns={columns}
                    nextText={<i class="fas fa-arrow-left"></i>}
                    previousText={<i class="fas fa-arrow-right"></i>}
                    data={this.state.nitur}
                    filterable
                    resizable={false}
                    getTrProps = {this.getTrProps}
                    defaultPageSize= {17}
                    noDataText = "שחר הדביבון אכל פה 2020"
                    SubComponent={ props => {
                            return(
                                <a><EditNitur niturid = {props.original._id} modal={true} /></a>
                            )
                        }
                    }
                    style={{direction: "rtl", width: "40%", marginLeft: "auto",marginRight: "auto"}}
                >
                </ReactTable>
                <AddNitur />
            </div>
        )
    }
}

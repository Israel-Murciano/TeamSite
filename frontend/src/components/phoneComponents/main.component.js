import React, { Component } from 'react';
import axios from 'axios';
import AddPhone from './add-phone.component';
import EditPhone from './edit-phone.component';
import {node_host,node_port} from '../../config';
import ReactTable from "react-table";
import "../../css/phone-table.css";
import "../../css/button.css";
import "../../css/modal.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import matchSorter from "match-sorter";

export default class PhoneList extends Component {
    constructor(props) {
        super(props);

        this.deletePhone = this.deletePhone.bind(this);

        this.state = {phones: [1]};
    }
    
    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/phones/')
            .then(response => {
                this.setState({ phones: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deletePhone(id) {
        axios.delete('http://' + node_host + ':' + node_port + '/api/phones/'+id)
            .then(res => console.log(res.data));

        this.setState({
            phones: this.state.phones.filter(el => el._id !== id)
        })
    }

    render() {
        const columns = [
            {
                Header: "Name",
                accessor: "name",
                width: 320,
                sortable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "name" ] }]}),
                filterAll: true
            },
            {
                Header: "Number",
                accessor: "number",
                width: 400,
                sortable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: [{threshold: matchSorter.rankings.WORD_STARTS_WITH, key:[ "number" ] }]}),
                filterAll: true
            }

        ]
        return (
            <div>
                <h1>
                    <i className="fas fa-phone mr-3 blue-text" aria-hidden="true"/>
                    <strong>Phone Book</strong>
                </h1>
                <ReactTable className="tablephone"
                    columns={columns}
                    nextText={<i class="fas fa-arrow-left"></i>}
                    previousText={<i class="fas fa-arrow-right"></i>}
                    data={this.state.phones}
                    filterable
                    resizable={false}
                    getTrProps = {this.getTrProps}
                    defaultPageSize= {17}
                    noDataText = "שחר הדביבון אכל פה 2020"
                    SubComponent={ props => {
                            return(
                                <a><EditPhone phoneid = {props.original._id} modal={true} /></a>
                            )
                        }
                    }
                    style={{direction: "rtl", width: "40%", marginLeft: "auto",marginRight: "auto"}}
                >
                </ReactTable>
                <AddPhone />
            </div>
        )
    }
}

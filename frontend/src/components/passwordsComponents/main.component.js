import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {node_host,node_port} from '../../config';
import AddPass from './add-pass.component';

export default class PasswordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
                passwords: [],
            }
    };
        
    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/passwords')
            .then(res => {
                this.setState({passwords: res.data})
            })
    }

    componentDidUpdate() {
        axios.get('http://' + node_host + ':' + node_port + '/api/passwords')
            .then(res => {
              this.setState({passwords: res.data})
           })
    }
    
    createBody()
    {
        return this.state.passwords.map(function(item) {
            return (
                    <tr>
                        <td> {item.component} </td>
                        <td> {item.username} </td>
                        <td> {item.password}</td>
                    </tr>
            )
        })
    }
    
    render () {
        return (
            <div >
                <h3 style={{margin: "25px"}}> Passwords </h3>
                <AddPass />    
                <table className="table table-striped table-hover" style={{margeinTop: 20}}>
                    <thead>
                        <tr>
                            <th> Component </th>
                            <th> Username </th>
                            <th> Password </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.createBody() }
                    </tbody>
                </table>
            </div>
        )
    }
}
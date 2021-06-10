import React, { Component } from 'react';
import axios from 'axios';
import {node_host,node_port} from '../../config';

export default class EditBackup extends Component {
    constructor(props) {
        super(props);

        this.onChangenodename = this.onChangenodename.bind(this);
        this.onChangeinstancename = this.onChangeinstancename.bind(this);
        this.onChangesubclientname = this.onChangesubclientname.bind(this);
        this.onChangestarttime = this.onChangestarttime.bind(this);
        this.onChangeendtime = this.onChangeendtime.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);
        this.onChangefailurereason = this.onChangefailurereason.bind(this);
        this.onChangecomment = this.onChangecomment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nodename: '',
            instancename: '',
            subclientname: '',
            starttime: '',
            endtime: '',
            status: '',
            failurereason: '',
            comment: '',
        }
    }    

    componentDidMount() {
        axios.get('http://' + node_host + ':' + node_port + '/api/backups/'+this.props.match.params.id)
            .then(Response => {
                this.setState({
                    nodename: Response.data.nodename,
                    instancename: Response.data.instancename,
                    subclientname: Response.data.subclientname,
                    starttime: Response.data.starttime,
                    endtime: Response.data.endtime,
                    status: Response.data.status,
                    failurereason: Response.data.failurereason,
                    comment: Response.data.comment,
                })
            })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangenodename(e) {
        this.setState({
            nodename: e.target.value
        });
    }

    onChangeinstancename(e) {
        this.setState({
            instancename: e.target.value
        });
    }

    onChangesubclientname(e) {
        this.setState({
            subclientname: e.target.value
        });
    }

    onChangestarttime(e) {
        this.setState({
            starttime: e.target.value
        });
    }

    onChangeendtime(e) {
        this.setState({
            endtime: e.target.value
        });
    }

    onChangestatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangefailurereason(e) {
        this.setState({
            failurereason: e.target.value
        });
    }

    onChangecomment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const backup = {
            nodename: this.state.nodename,
            instancename: this.state.instancename,
            subclientname: this.state.description,
            starttime: this.state.starttime,
            endtime: this.state.endtime,
            status: this.state.status,
            failurereason: this.state.failurereason,
            comment: this.state.comment,
        }

        axios.post('http://' + node_host + ':' + node_port + '/api/backups/update/'+this.props.match.params.id, backup)
            .then(res => console.log(res.data));

        window.location = '/TeamSite/backups';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <div className="form-group"  >
                        <label>Node Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nodename}
                            onChange={this.onChangenodename}
                            disabled
                            />
                    </div>  
                    <div className="form-group"  >
                    <label>Instance Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.instancename}
                        onChange={this.onChangeinstancename}
                        disabled
                        />
                    </div>
                    <div className="form-group"  >
                    <label>Subclient Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.subclientname}
                        onChange={this.onChangesubclientname}
                        disabled
                        />
                    </div>
                    <div className="form-group"  >
                    <label>Start Time: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.starttime}
                        onChange={this.onChangestarttime}
                        disabled
                        />
                    </div>
                    <div className="form-group"  >
                    <label>End Time: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.endtime}
                        onChange={this.onChangeendtime}
                        disabled
                        />
                    </div>
                    <div className="form-group"  >
                    <label>Status: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.status}
                        onChange={this.onChangestatus}
                        disabled
                        />
                    </div>
                    <div className="form-group"  >
                    <label>Failure Reason: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.failurereason}
                        onChange={this.onChangefailurereason}
                        disabled
                        />
                    </div>
                    <div className="form-group"  >
                    <label>Comment: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.comment}
                        onChange={this.onChangecomment}
                        />
                    </div>
                    <div className="from-group">
                    <input type="submit" value="Save" className="btn btn-primary" />
                    </div>           
                </div>
            </form>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import '../../css/modal.css'
import 'animate.css';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {node_host,node_port} from '../../config';
import "../../css/div.css";

class ShowVolumes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            volumes: [],
            volume: '',
            TotalSize: '',
            Available: '',
        };
        
        this.onChangevolume = this.onChangevolume.bind(this);
        this.onChangeTotalSize = this.onChangeTotalSize.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        axios.get('http://' + node_host + ":" + node_port + '/api/svms/'+this.props.SVMid)
        .then(res => {
            this.setState({
                volumes: res.data.volumes,
                volume: res.data.volumes.volume,
                TotalSize: res.data.volumes.TotalSize,
                Available: res.data.volumes.Available,
            })
            console.log(this.state.volume)
        })
    }

    onChangevolume(e) {
        console.log("vomponrn");
        this.setState({
            volume: e.target.value
        });
    }
    onChangeTotalSize(e) {
        console.log("user");
        this.setState({
            TotalSize: e.target.value
        });
    }
    onChangeAvailable(e) {
        console.log("pass");
        this.setState({
            Available: e.target.value
        });
    }
   
    onToggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    createBody() {
        return this.state.volumes.map(item2 => {
            var total = item2.TotalSize.substring(0, item2.TotalSize.length-3)
            var available = item2.Available.substring(0, item2.Available.length-3) 
            var percentage = (available/total)*100
            return (
                <tr>
                    <td style={{fontSize: "15px"}}> {item2.volume}</td> {/*instancename*/}
                    <td style={{fontSize: "15px"}}> {item2.TotalSize}</td> {/*subclientname*/}
                    <td style={{fontSize: "15px"}}> {item2.Available} </td> {/*starttime*/}
                    <td style={{fontSize: "15px"}}> {percentage.toFixed(1)}</td>
                </tr>
            )
        }).reverse();
    }

    render() {
        return (
            <div className="fa fa-plus" onClick={this.onToggle}>   
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="lg">
                    <ModalHeader toggle={this.toggle} style={{color: "rgb(0, 128, 200)"}}> {this.state.app} SVM Info </ModalHeader>
                        <form onSubmit={this.onSubmit}>
                            <ModalBody>
                                    <table className="table table-striped table-hover" style={{margeinTop: 20}}>
                                        <thead>
                                            <tr>
                                                <th> Volume </th>
                                                <th> Total Size </th>
                                                <th> Available </th>
                                                <th> Used Space %</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.createBody()}
                                        </tbody>
                                    </table>
                            </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.onToggle}> Exit </Button>
                        </ModalFooter>  
                    </form>
                </Modal>
            </div>
        )         
    }
}

export default ShowVolumes;
import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";

class ServersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      backdrop: true,
      app: "",
      servers: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  serverListing() {
    return this.props.servers.split(',').map(server => {
        return (
        <font style={{color:"blue", fontSize:"18px"}}> 
            {server} <br /> 
        </font>
        )
    })
  }

  render() {
    return (
      <div onClick={this.toggle}>
        <Button color="info">Servers</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>
            <h2>
              <strong>
                {" "}{this.props.app} Servers{" "}
              </strong>
            </h2>
          </ModalHeader>
          <ModalBody>
            {this.serverListing()}    
          </ModalBody>
        </Modal>
        
      </div>
    );
  }
}

export default ServersList;

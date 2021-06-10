import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { confirmAlert } from "react-confirm-alert";
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
import '../../css/uploadAlert.css';

class UploadAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: "static"
    };

    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onClick() {
            alert("Rename the fucking file")
        }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>
            <h2> Make sure your file name is OK! </h2>
          </ModalHeader>

          <ModalBody className="bodyfont">
          File Name example: <p>Info - OMI.pdf</p>
          </ModalBody>

          <ModalBody className="bodyfont">
          First the file name, after a '-', and last the app name with .pdf in the end (with spaces).              
          </ModalBody>

          <ModalBody className="bodyfontred">            
          This is important, or you will fuck the TeamSite!   
          </ModalBody>

          <ModalBody> 
          <p>You can use a script to change an entire folder:
          "\\SharedFolder"</p>
          </ModalBody>

          <ModalFooter>
            <Button color="info" onClick={this.toggle}>Ok it's fine</Button>
            <Button color="red" onClick={this.onClick}>I am an idiot</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UploadAlert;

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
import '../../css/buttonDelete.css';

class ButtonDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true
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
            axios
              .get(
                "http://" +
                  node_host +
                  ":" +
                  node_port +
                  "/api/deletepdf/" +
                  this.props.pdfname,
                {
                  methood: "GET",
                  responseType: "blob"
                }
              )
              .then(res => {
                window.location.reload(false);
              })
              .catch(function(error) {
                console.log(error);
              });
          
        }
  render() {
    return (
      <div className="Delete" onClick={this.toggle}>
        <span size="large">&times;</span>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>
            <h2> Delete the PDF? </h2>
          </ModalHeader>
          <ModalBody>
            <Button color="info" onClick={this.onClick}>Yes</Button>
            <Button color="red" onClick={this.toggle}> No </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ButtonDelete;

import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../../css/modal.css";
import "animate.css";
import Button from "@material-ui/core/Button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from "reactstrap";
import classNames from "classnames";

var Classes = classNames({ btn: true, font: true });

class AddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      backdrop: true,
      member: ""
    };

    this.member = this.member.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // Update Methods
  member(e) {
    this.setState({
      member: e.target.value
    });
  }

  // Save Button
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.member
    };

    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    // Updates the data in the mongo
    axios.post("http://" + node_host + ":" + node_port + "/api/humans/add/", obj);
    // Refresh the Page
    window.location.reload(false);
  }

  delete(e) {
    e.preventDefault();
    const obj = {
      name: this.state.member
    };
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    // Updates the data in the mongo
    axios.post("http://" + node_host + ":" + node_port + "/api/humans/delete", obj);
    // Refresh the Page
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          fontSize="small"
          id="buttonLeft"
          onClick={this.toggle}
        >
          Add/Delete a Member
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}> Add a new member </ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
              <div>
                <label style={{ paddingTop: "1px" }}>
                  <strong> Name: </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.event}
                  onChange={this.member}
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                {" "}Add{" "}
              </Button>
              <Button color="secondary" onClick={this.delete}>
                {" "}Delete{" "}
              </Button>
              <Button  onClick={this.toggle}>
                {" "}Cancel{" "}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddMember;

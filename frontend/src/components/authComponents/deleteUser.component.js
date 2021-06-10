import React, { Component } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../css/modal.css";
import "animate.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { node_host, node_port } from "../../config";
import "../../css/div.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-rickiest.css";

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      username: ""
    };

    this.username = this.username.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://" + node_host + ":" + node_port + "/api/getUsers/")
      .then(response => {
        this.setState({
          users: response.data
        });
      });
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // Update Methods
  username(e) {
    this.setState({
      username: e.target.value
    });
  }

  // Save Button
  onSubmit(e) {
    console.log("test " + this.state.username);
    e.preventDefault();

    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    // Updates the data in the mongo
    axios
      .post(
        "http://" +
          node_host +
          ":" +
          node_port +
          "/api/deleteUser/" +
          this.state.username
      )
      .then(response => console.log("in axios" + response.data));

    // Refresh the Page
    window.location.reload(false);
  }

  usersList() {
    return this.state.users.map(singleUser => {
      return (
        <option value={singleUser.username}>
          {singleUser.username}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <AwesomeButton type="primary" onPress={() => {
                      this.toggle()
                    }}>
        Delete User
        <i className="fa fa-user-slash ml-2"> </i>{" "}
        </AwesomeButton>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
          size="lg"
        >
          <ModalHeader
            toggle={this.toggle}
            style={{ color: "rgb(0, 128, 200)" }}
          >
            {" "}Delete User{" "}
          </ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
              <div>
                <div className="form-group">
                  <label>Name: </label>
                  <select
                    style={{ direction: "rtl" }}
                    className="form-control"
                    onChange={this.username}
                  >
                    <option value="" />
                    {this.usersList()}
                  </select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                {" "}Delete{" "}
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                {" "}Cancel{" "}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default DeleteUser;

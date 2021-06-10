import React, { Component } from "react";
import axios from "axios";
import { node_host, node_port } from "../../config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../../css/modal.css";
import "animate.css";
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
import classNames from "classnames";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
require('datejs');

var Classes = classNames({ btn: true, font: true });
var year = Date.today().toString("yyyy");

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      backdrop: true,
      event: "",
      date: "",
      specialEvents: [],
      selectedDay: undefined,
      selectedDays: [],
      disabledDays: []
    };

    this.event = this.event.bind(this);
    this.date = this.date.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://" + node_host + ":" + node_port + "/api/specialEvents/")
      .then(res => {
        this.setState({ specialEvents: res.data });
        this.state.specialEvents.map(singleEvent => {
          var splitted = (singleEvent.date).split('/')
          this.state.disabledDays.push(new Date(year, (splitted[1] -1), splitted[0]));
        });
      });
  }


  handleDayClick(day, modifiers = {}, { selected }) {
    if (modifiers.disabled) {
      return;
    }
    this.setState({ selectedDay: modifiers.selected ? undefined : day,
    })
    
    const { selectedDays } = this.state;
    if (modifiers.selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
      
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
    console.log("DAYS ARE: " + this.state.selectedDays);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // Update Methods
  event(e) {
    this.setState({
      event: e.target.value
    });
  }
  date(e) {
    this.setState({
      date: e.target.value
    });
  }

  // Save Button
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      event: this.state.event,
      date: this.state.date
    };

    this.setState(prevState => ({
      modal: !prevState.modal
    }));

    // Updates the data in the mongo
    this.state.selectedDays.map(day => {
      day = day.toString("dd/MM");
      var obj = {
        event: this.state.event,
        date: day
      };
      axios.post(
        "http://" + node_host + ":" + node_port + "/api/specialEvent/add/",
        obj
      );
    });
    // Refresh the Page
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <button className={Classes} onClick={this.toggle}>
          Special Events
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}> Add a special event </ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
              <div>
                <label style={{ paddingTop: "1px" }}>
                  <strong> Event: </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.event}
                  onChange={this.event}
                  required
                />
              </div>
              <div>
                <DayPicker
                  selectedDays={this.state.selectedDays}
                  onDayClick={this.handleDayClick}
                  disabledDays={this.state.disabledDays}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                {" "}Add{" "}
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

export default AddEvent;

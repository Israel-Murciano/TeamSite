import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { node_host, node_port } from "../../config";
import { whatRole } from "../../utils/rolesCheck";
import "../../css/shifts.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBInputGroup
} from "mdbreact";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import Icon from "@material-ui/core/Icon";
import Edit from "./edit-specialEvents.component";
import AddEvent from "./add-SpecialEvent";
import AddMember from "./add-Member.component";
require("datejs");

// pointer to know what week the table will show. -1 is the current week.
var pointer = -1;

const Humans = props =>
  <font color="white" size="4">
    <strong>
      {props.human.name}
    </strong>
  </font>;

export default class ShiftsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humans: [],
      shifts: [],
      specialEvents: [],
      custom: "",
      customID: '',
      Sunday: Date.sunday().toString("dd/MM"),
      Monday: Date.monday().toString("dd/MM"),
      Tuesday: Date.tuesday().toString("dd/MM"),
      Wednesday: Date.wednesday().toString("dd/MM"),
      Thursday: Date.thursday().toString("dd/MM"),
      Friday: Date.friday().toString("dd/MM"),
      Saturday: Date.saturday().toString("dd/MM"),
      Week: []
    };
  }
  componentDidMount() {
    axios
      .get("http://" + node_host + ":" + node_port + "/api/shifts/")
      .then(res => {
        this.setState({ shifts: res.data });
      });

    axios
      .get("http://" + node_host + ":" + node_port + "/api/humans/")
      .then(res => {
        this.setState({ humans: res.data });
      });

    axios
      .get("http://" + node_host + ":" + node_port + "/api/specialEvents/")
      .then(res => {
        this.setState({ specialEvents: res.data });
      });
  }

  async nextWeek() {
    var validateID = "";
    pointer = pointer + 1;
    var CurrentWeek = Date.today().addWeeks(pointer);
    await this.setState({
      Sunday: CurrentWeek.sunday().toString("dd/MM"),
      Monday: CurrentWeek.monday().toString("dd/MM"),
      Tuesday: CurrentWeek.tuesday().toString("dd/MM"),
      Wednesday: CurrentWeek.wednesday().toString("dd/MM"),
      Thursday: CurrentWeek.thursday().toString("dd/MM"),
      Friday: CurrentWeek.friday().toString("dd/MM"),
      Saturday: CurrentWeek.saturday().toString("dd/MM")
    });
    this.setState(prevState => ({
      Week: [
        this.state.Sunday,
        this.state.Monday,
        this.state.Tuesday,
        this.state.Wednesday,
        this.state.Thursday,
        this.state.Friday,
        this.state.Saturday
      ]
    }));
    this.state.humans.map(person => {
      let counter = 0
      this.state.Week.map(singleDay => {
        counter = counter + 1
        

        validateID = this.getID(singleDay, person.name);
        if (!validateID) {
          if(counter == 6) {
            const newObj = {
              newName: person.name,
              newDate: singleDay,
              newShift: "Shabat Shalom"
            };
            axios.post(
              "http://" + node_host + ":" + node_port + "/api/createShift/",
              newObj
            );
          } else if (counter == 7) {
            const newObj = {
              newName: person.name,
              newDate: singleDay,
              newShift: "Shabat Shalom"
            };
            axios.post(
              "http://" + node_host + ":" + node_port + "/api/createShift/",
              newObj
            );
          } else {

          
          const newObj = {
            newName: person.name,
            newDate: singleDay,
            newShift: "Regular"
          };
          axios.post(
            "http://" + node_host + ":" + node_port + "/api/createShift/",
            newObj
          );
        }
      }
      });
    });
    axios
      .get("http://" + node_host + ":" + node_port + "/api/shifts/")
      .then(res => {
        this.setState({ shifts: res.data });
        {
          this.componentDidMount();
        }
      });
  }

  prevWeek() {
    pointer = pointer - 1;
    var CurrentWeek = Date.today().addWeeks(pointer);
    this.setState({
      Sunday: CurrentWeek.sunday().toString("dd/MM"),
      Monday: CurrentWeek.monday().toString("dd/MM"),
      Tuesday: CurrentWeek.tuesday().toString("dd/MM"),
      Wednesday: CurrentWeek.wednesday().toString("dd/MM"),
      Thursday: CurrentWeek.thursday().toString("dd/MM"),
      Friday: CurrentWeek.friday().toString("dd/MM"),
      Saturday: CurrentWeek.saturday().toString("dd/MM")
    });

    {
      this.createBody();
    }
    {
      this.render();
    }
  }

  // Lists Functions

  // Return a special event
  specialEventsList(day) {
    return this.state.specialEvents.map(event => {
      if (event.date == day) {
        return (
          <font color="white" size="3">
            <strong>
              {event.event}
            </strong>
          </font>
        );
      }
    });
  }

  // Return the shift for the toran in the exact day
  shiftList(day, toran) {
    return this.state.shifts.map(singleShift => {
      if (singleShift.date == day && singleShift.name == toran) {
        return (
          <font color="white" size="2">
            <strong>
              {singleShift.shift}
            </strong>
          </font>
        );
      }
    });
  }

  // Return every person in Mivzai
  humansList() {
    return this.state.humans.map(singleHuman => {
      return <Humans human={singleHuman} />;
    });
  }

  // Props Functions
 // #00897b teal lighten-1 evning shift #00796b teal darken-2
  // Return the background color for every diffrent shift
  getColor(day, toran) {
    let color = "";
    this.state.shifts.map(singleShift => {
      if (singleShift.date == day && singleShift.name == toran) {
        if (singleShift.shift == "Regular") {
          return (color = "#90caf9 blue lighten-3");
        } else if (singleShift.shift == "Late Regular") {
          return (color = "#90caf9 blue lighten-1");

        } else if (singleShift.shift == "Morning") {
          return (color = "#00bfa5 teal accent-4");
        } else if (singleShift.shift == "Morning Shift") {
          return (color = "#26a69a teal");
        } else if (singleShift.shift == "Evening") {
          return (color = "#00838f cyan darken-3");
        } else if (singleShift.shift == "Evening Shift") {
          return (color = "#00838f cyan darken-4");
        } else if (singleShift.shift == "Night Shift") {
          return (color = "#ef5350 red lighten-1");

        } else if (singleShift.shift == "Shabat Shalom") {
          return (color = "#1565c0 blue darken-3");
        } else if (singleShift.shift == "Shabat Shift") {
          return (color = "#ef5350 red darken-1");
        } else if (singleShift.shift == "Happy Holiday") {
          return (color = "#1565c0 blue darken-3");
        } else if (singleShift.shift == "Holiday Shift") {
          return (color = "#ef5350 red darken-1");

        } else if (singleShift.shift == "Sick Day") {
          return (color = "#ffd740 amber darken-2");
        } else if (singleShift.shift == "Hafnya") {
          return (color = "#ffd740 amber darken-3");
        } else if (singleShift.shift == "Corona") {
          return (color = "#3f5ib5 indigo lighten-2");

        } else if (singleShift.shift == "Aboard") {
          return (color = "#c8e6c9 green darken-1");
        } else if (singleShift.shift == "Freedom") {
          return (color = "#c8e6c9 green lighten-1");
        } else if (singleShift.shift == "After") {
          return (color = "#ffab91 deep-orange lighten-2");

        } else if (singleShift.shift == "Guard Duty") {
          return (color = "#ffcdd2 red lighten-3");

        } else {
          return (color = "#90caf9 blue lighten-2");
        }
      }
    });
    return color;
  }

  // Return the ID of a document for a shift
  getID(day, toran) {
    let id = "";
    this.state.shifts.map(singleShift => {
      if (singleShift.date == day && singleShift.name == toran) {
        return (id = singleShift._id);
      }
    });
    return id;
  }

  // Return the ID of a special event document
  getSpecialEventID(day) {
    var idEvent = "";
    this.state.specialEvents.map(singleEvent => {
      if (singleEvent.date == day) {
        return (idEvent = singleEvent._id);
      }
    });
    return idEvent;
  }

  specialEventExist(day) {
    var verification = 0;
    this.state.specialEvents.map(event => {
      if (event.date == day) {
        return (verification = 1);
      }
    });
    return verification;
  }

  // Changing a shift
  updateShift(shiftID, futureShift) {
    if (shiftID) {
      const obj = {
        futureShift: futureShift
      };
      axios.post(
        "http://" + node_host + ":" + node_port + "/api/shiftUpdate/" + shiftID,
        obj
      );
      axios
        .get("http://" + node_host + ":" + node_port + "/api/shifts/")
        .then(res => {
          this.setState({ shifts: res.data });
          {
            this.componentDidMount();
          }
        });
    }
  }

  submitHandler = e => {
    e.preventDefault();
    const obj = {
      futureShift: this.state.custom
    };
    axios.post(
      "http://" + node_host + ":" + node_port + "/api/shiftUpdate/" + this.state.customID,
        obj
    )
    axios
        .get("http://" + node_host + ":" + node_port + "/api/shifts/")
        .then(res => {
          this.setState({ shifts: res.data });
          {
            this.componentDidMount();
          }
        });

    console.log("CUSTOM: " + this.state.customID)
    this.setState({ custom: '' });
  };

  changeHandler = e => {
    this.setState({ custom: e.target.value, customID: e.target.name });
  };

  // Creating the DropDown for every single shift in the table
  createDropDown(text, color, israelID) {
    return (
      <MDBDropdown>
        <MDBDropdownToggle color={color} className="MainDropDown" size="sm">
          {text}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          {/* Main DropDown */}

          {whatRole() > 2 &&
            <MDBDropdownItem
              onClick={() => this.updateShift(israelID, "Regular")}
            >
              {" "}<strong><font color="#90caf9">Regular</font></strong>{" "}
            </MDBDropdownItem>}
            {whatRole() > 2 &&
            <MDBDropdownItem
              onClick={() => this.updateShift(israelID, "Late Regular")}
            >
              {" "}<strong><font color="#90caf9">Late Regular</font></strong>{" "}
            </MDBDropdownItem>}
          {whatRole() > 2 &&
            <MDBDropdownItem
              onClick={() => this.updateShift(israelID, "Morning")}
            >
              {" "}<strong><font color="#00bfa5">Morning</font></strong>{" "}
            </MDBDropdownItem>}
          {whatRole() > 2 &&
            <MDBDropdownItem
              onClick={() => this.updateShift(israelID, "Morning Shift")}
            >
              {" "}<strong><font color="#26a69a">Morning Shift</font></strong>{" "}
            </MDBDropdownItem>}
          {whatRole() > 2 &&
            <MDBDropdownItem
              onClick={() => this.updateShift(israelID, "Evening")}
            >
              {" "}<strong><font color="#00838f">Evening</font></strong>{" "}
            </MDBDropdownItem>}
            {whatRole() > 2 &&
            <MDBDropdownItem
              onClick={() => this.updateShift(israelID, "Evening Shift")}
            >
              {" "}<strong><font color="#00838f">Evening Shift</font></strong>{" "}
            </MDBDropdownItem>}
          

          {whatRole() > 2 &&
            <MDBDropdownItem
              onClick={() => this.updateShift(israelID, "Night Shift")}
            >
              {" "}<strong><font color="#ef5350">Night Shift</font></strong>{" "}
            </MDBDropdownItem>}

          {whatRole() > 2 &&
            <MDBDropdownItem onClick={() => this.updateShift(israelID, "After")}>
              {" "}<strong><font color="#ffab91">After</font></strong>{" "}
            </MDBDropdownItem>}

            {whatRole() > 2 &&
            <MDBDropdownItem onClick={() => this.updateShift(israelID, "Shabat Shalom")}>
              {" "}<strong><font color="#1565c0">Shabat Shalom</font></strong>{" "}
            </MDBDropdownItem>}

            {whatRole() > 2 &&
            <MDBDropdownItem onClick={() => this.updateShift(israelID, "Shabat Shift")}>
              {" "}<strong><font color="#ef5350">Shabat Shift</font></strong>{" "}
            </MDBDropdownItem>}

            {whatRole() > 2 &&
            <MDBDropdownItem onClick={() => this.updateShift(israelID, "Freedom")}>
              {" "}<strong><font color="green">Freedom</font></strong>{" "}
            </MDBDropdownItem>}

            {whatRole() > 2 &&
            <MDBDropdownItem onClick={() => this.updateShift(israelID, "Corona")}>
              {" "}<strong><font color="purple">Corona</font></strong>{" "}
            </MDBDropdownItem>}

            <MDBDropdownItem
                  onClick={() => this.updateShift(israelID, "Guard Duty")}
                >
                  {" "}<strong><font color="pink">Guard Duty</font></strong>{" "}
            </MDBDropdownItem>

          {/* Nested DropDown */}

          {whatRole() > 2 &&
            <MDBDropdown>
              <MDBDropdownToggle className="NestedDropDown" size="sm">
                More
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem
                  onClick={() => this.updateShift(israelID, "Sick Day")}
                >
                  {" "}<strong><font color="#ffd740">Sick Day</font></strong>{" "}
                </MDBDropdownItem>

                <MDBDropdownItem
                  onClick={() => this.updateShift(israelID, "Hafnya")}
                >
                  {" "}<strong><font color="#ffd740">Hafnya</font></strong>{" "}
                </MDBDropdownItem>

                <MDBDropdownItem
                  onClick={() => this.updateShift(israelID, "Aboard")}
                >
                  {" "}<strong><font color="green">Aboard</font></strong>{" "}
                </MDBDropdownItem>

                <MDBDropdownItem 
                onClick={() => this.updateShift(israelID, "Happy Holiday")}>
                  {" "}<strong><font color="#1565c0">Happy Holiday</font></strong>{" "}
                </MDBDropdownItem>

                <MDBDropdownItem 
                onClick={() => this.updateShift(israelID, "Holiday Shift")}>
                  {" "}<strong><font color="#ef5350">Holiday Shift</font></strong>{" "}
                </MDBDropdownItem>

                <MDBDropdownItem
                  onClick={() => this.updateShift(israelID, "Convention")}
                >
                  {" "}<strong><font color="blue">Convention</font></strong>{" "}
                </MDBDropdownItem>

                <MDBDropdownItem
                  onClick={() => this.updateShift(israelID, "Course")}
                >
                  {" "}<strong><font color="blue">Course</font></strong>{" "}
                </MDBDropdownItem>

                <form onSubmit={this.submitHandler}>
                  <MDBInput type="text" label="Other" onChange={this.changeHandler} value={this.state.custom} name={israelID}/>
                </form>
              </MDBDropdownMenu>
            </MDBDropdown>}

          {/* No Role DropDown */}

          {whatRole() < 3 &&
            <MDBDropdownItem>
              {" "}<strong><font color="black">You can't do shit</font></strong>{" "}
            </MDBDropdownItem>}
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }

  // Create the body of the table
  createBody = () => {
    let toranName = "";
    let body = [];
    for (let i = 0; i < this.state.humans.length; i++) {
      toranName = this.state.humans[i].name;
      body.push(
        <tr>
          <td bgcolor="#33b5e5" className="humans">
            {this.humansList()[i]}{" "}
          </td>
          <td>
            {this.createDropDown(
              this.shiftList(this.state.Sunday, toranName),
              this.getColor(this.state.Sunday, toranName),
              this.getID(this.state.Sunday, toranName)
            )}
          </td>
          <td>
            {this.createDropDown(
              this.shiftList(this.state.Monday, toranName),
              this.getColor(this.state.Monday, toranName),
              this.getID(this.state.Monday, toranName)
            )}
          </td>
          <td>
            {this.createDropDown(
              this.shiftList(this.state.Tuesday, toranName),
              this.getColor(this.state.Tuesday, toranName),
              this.getID(this.state.Tuesday, toranName)
            )}
          </td>
          <td>
            {this.createDropDown(
              this.shiftList(this.state.Wednesday, toranName),
              this.getColor(this.state.Wednesday, toranName),
              this.getID(this.state.Wednesday, toranName)
            )}
          </td>
          <td>
            {this.createDropDown(
              this.shiftList(this.state.Thursday, toranName),
              this.getColor(this.state.Thursday, toranName),
              this.getID(this.state.Thursday, toranName)
            )}
          </td>
          <td>
            {this.createDropDown(
              this.shiftList(this.state.Friday, toranName),
              this.getColor(this.state.Friday, toranName),
              this.getID(this.state.Friday, toranName)
            )}
          </td>
          <td>
            {this.createDropDown(
              this.shiftList(this.state.Saturday, toranName),
              this.getColor(this.state.Saturday, toranName),
              this.getID(this.state.Saturday, toranName)
            )}
          </td>
        </tr>
      );
    }
    return body;
  };

  render() {
    return (
      <div>
        <h1>
          <i
            className="fas fa-calendar-day mr-3 blue-text"
            aria-hidden="true"
          />
          <strong>Mivzai Shifts</strong>
        </h1>

        <Button
          onClick={() => this.nextWeek()}
          id="buttonRight"
          variant="contained"
          color="action"
          fontSize="small"
          startIcon={<UpdateRoundedIcon />}
        >
          Next Week
        </Button>
        <Button
          onClick={() => this.prevWeek()}
          id="buttonLeft"
          variant="contained"
          fontSize="small"
          startIcon={<HistoryRoundedIcon />}
        >
          Previous Week
        </Button>
        {whatRole() > 2 &&
        <AddMember />
        }
        <MDBTable btn fixed striped responsive>
          <MDBTableHead color="blue-gradient" textWhite size="1">
            <tr>
              <th className="fontSize">
                <i
                  className="fas fa-users mr-2 white-text fa-spin"
                  aria-hidden="true"
                />
                Names
              </th>
              <th className="fontSize">
                {"Sunday "}
                {this.state.Sunday}{" "}
              </th>
              <th className="fontSize">
                {"Monday "}
                {this.state.Monday}{" "}
              </th>
              <th className="fontSize">
                {"Tuesday "}
                {this.state.Tuesday}{" "}
              </th>
              <th className="fontSize">
                {"Wednesday "}
                {this.state.Wednesday}{" "}
              </th>
              <th className="fontSize">
                {"Thursday "}
                {this.state.Thursday}{" "}
              </th>
              <th className="fontSize">
                <i className="fas fa-bed mr-2 white-text" aria-hidden="true" />
                {"Friday "}
                {this.state.Friday}{" "}
              </th>
              <th className="fontSize">
                <i className="fas fa-bed mr-2 white-text" aria-hidden="true" />
                {"Saturday "}
                {this.state.Saturday}{" "}
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableHead color="blue-gradient" textWhite size="1">
            <tr>
              {whatRole() > 2 && <AddEvent />}
              {whatRole() < 3 && <th className="fontSize">Special Events</th>}
              <th>
                {this.specialEventsList(this.state.Sunday)}
                {whatRole() > 2 &&
                  this.specialEventExist(this.state.Sunday) == 1 &&
                  <Edit app={this.getSpecialEventID(this.state.Sunday)} />}
              </th>
              <th>
                {this.specialEventsList(this.state.Monday)}
                {whatRole() > 2 &&
                  this.specialEventExist(this.state.Monday) == 1 &&
                  <Edit app={this.getSpecialEventID(this.state.Monday)} />}
              </th>
              <th>
                {this.specialEventsList(this.state.Tuesday)}
                {whatRole() > 2 &&
                  this.specialEventExist(this.state.Tuesday) == 1 &&
                  <Edit app={this.getSpecialEventID(this.state.Tuesday)} />}
              </th>
              <th>
                {this.specialEventsList(this.state.Wednesday)}
                {whatRole() > 2 &&
                  this.specialEventExist(this.state.Wednesday) == 1 &&
                  <Edit app={this.getSpecialEventID(this.state.Wednesday)} />}
              </th>
              <th>
                {this.specialEventsList(this.state.Thursday)}
                {whatRole() > 2 &&
                  this.specialEventExist(this.state.Thursday) == 1 &&
                  <Edit app={this.getSpecialEventID(this.state.Thursday)} />}
              </th>
              <th>
                {this.specialEventsList(this.state.Friday)}
                {whatRole() > 2 &&
                  this.specialEventExist(this.state.Friday) == 1 &&
                  <Edit app={this.getSpecialEventID(this.state.Friday)} />}
              </th>
              <th>
                {this.specialEventsList(this.state.Saturday)}
                {whatRole() > 2 &&
                  this.specialEventExist(this.state.Saturday) == 1 &&
                  <Edit app={this.getSpecialEventID(this.state.Saturday)} />}
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.createBody()}
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}


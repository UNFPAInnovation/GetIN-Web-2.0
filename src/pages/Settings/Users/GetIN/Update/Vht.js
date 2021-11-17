import React, { Component } from "react";
import _ from "underscore";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../../../api/services");

export default class ChewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      first_name: null,
      last_name: null,
      username: null,
      password: null,
      gender: null,
      email: null,
      phone_number: null,
      village: null,
      subcounty: null,
      villages: [],
      villages_copy: [],
      sub_counties: [],
      loading: false,
      is_active: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value,
      },
      function () {
        if (name === "sub_county") {
          //this.updateVillagesList();
        }
      }
    );
  }
  updateChew(e) {
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      loading: true,
    });
    alertifyjs.message("Updating CHEW..", 2, function () {});
    service.updateChew(
      this.state.id,
      {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        gender: this.state.gender,
        village: this.state.village,
        password: this.state.password,
        phone: this.state.phone_number,
        role: "chew",
      },
      function (error, response) {
        if (error) {
          thisApp.setState({
            loading: false,
          });
          alertifyjs.error("Request failed, try again ", function () {});
        } else {
          thisApp.setState({
            loading: false,
          });
          alertifyjs.success("Updated successfully", 2, function () {});
          window.location.reload();
        }
      }
    );
  }
  updateStatus() {
    const thisApp = this;
    thisApp.setState({
      loading: true,
    });
    alertifyjs.message(`${this.state.is_active ?("Activating"):("Deactivating")}`, 2, function () {});
    service.updateChew(
      this.state.id,
      {
        is_active: this.state.is_active,
      },
      function (error, response) {
        if (error) {
          thisApp.setState({
            loading: false,
          });
          alertifyjs.error("Request failed, try again ", function () {});
        } else {
          thisApp.setState({
            loading: false,
          });
          alertifyjs.success("Updated successfully", 2, function () {});
          window.location.reload();
        }
      }
    );
  }

  componentDidMount() {
    const updateData = this.props.data;
    console.log(updateData);
    this.setState({
      id: updateData.id,
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      username: updateData.username,
      password: updateData.password,
      gender: updateData.gender,
      email: updateData.email,
      phone_number: updateData.phone,
      is_active: updateData.is_active,
      // village: updateData.village.name,
      // subcounty: updateData.village.parish.subcounty.name,
    });
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleClose("modal")}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-md-10">
              <Modal.Title>
                <span> Update VHT</span>{" "}
              </Modal.Title>
            </div>
            <div className="col-md-2">
              <button
                className={`btn btn-sm ${
                  this.state.is_active ? "btn-danger" : "btn-success"
                }`}
                onClick={() =>
                  this.setState(
                    { is_active: this.state.is_active ? false : true },
                    () => this.updateStatus()
                  )
                }
              >
                {this.state.is_active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => this.updateChew(e)}>
            <div className="col-md-12">
              <div className="form-group col-md-6">
                <label>First name</label>
                <input
                  required
                  type="text"
                  onChange={this.handleChange}
                  name="first_name"
                  value={this.state.first_name}
                  className="form-control"
                  placeholder="John"
                  autoFocus={true}
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label>Last name</label>
                <input
                  required
                  type="text"
                  onChange={this.handleChange}
                  name="last_name"
                  value={this.state.last_name}
                  className="form-control"
                  placeholder="Musoke"
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label>Phone number</label>
                <input
                  required
                  type="tel"
                  onChange={this.handleChange}
                  name="phone_number"
                  value={this.state.phone_number}
                  className="form-control"
                  placeholder="070XXXXXX"
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label>Gender</label>
                <select
                  required
                  className="form-control"
                  name="gender"
                  onChange={this.handleChange}
                  value={this.state.gender}
                >
                  <option defaultValue value={null}>
                    Select gender
                  </option>
                  <option value={"female"}>Female</option>
                  <option value={"male"}>Male</option>
                </select>
              </div>
              <div className="form-group col-md-12">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="jmusoke@gmail.com"
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label>Username</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                  placeholder="jmusoke"
                ></input>
              </div>

              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  required
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  type="password"
                  placeholder="Password"
                ></input>
              </div>
            </div>
            <div className="col-md-12">
              <br className="clear-both" />
              <div className="form-group col-md-6">
                <label>Sub counties</label>
                <select
                  required
                  className="form-control"
                  name="sub_county"
                  onChange={this.handleChange}
                  value={this.state.sub_county}
                >
                  <option defaultValue value={null}>
                    Select subcounty
                  </option>
                  {this.state.sub_counties.map((value, key) => (
                    <option key={key} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>Villages</label>
                <select
                  required
                  className="form-control"
                  name="village"
                  onChange={this.handleChange}
                  value={this.state.village}
                >
                  <option defaultValue value={null}>
                    Select Village
                  </option>
                  {this.state.villages.map((value, key) => (
                    <option key={key} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <br className="clear-both" />
              <button type="submit" className="btn btn-primary">
                {this.state.loading ? "Updating Chew" : "Update"}
              </button>
              <br className="clear-both" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-default"
            onClick={() => this.props.handleClose("modal")}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

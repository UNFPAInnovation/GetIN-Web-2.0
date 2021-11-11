import React, { Component } from "react";
import _ from "underscore";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../api/services");

export default class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: null,
      last_name: null,
      username: null,
      password: null,
      gender: null,
      email: null,
      phone_number: null,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  addAdminUser(e) {
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      loading: true,
    });
    alertifyjs.message("Adding Admin User..", 2, function () {});
    service.addUser(
      {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        gender: this.state.gender,
        password: this.state.password,
        phone: this.state.phone_number,
        role: "manager",
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
          alertifyjs.success("Added successfully", 2, function () {});
          window.location.reload();
        }
      }
    );
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleClose("modal")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new Admin User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => this.addAdminUser(e)}>
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
              <br className="clear-both" />
              <div className="row">
                <div className="col-md-offset-9 col-md-2">
                  <button type="submit" className="btn btn-primary">
                    {this.state.loading ? "Adding User" : "Submit"}
                  </button>
                </div>
              </div>
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

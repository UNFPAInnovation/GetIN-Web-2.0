/* eslint-disable */
import React, { Component } from "react";
import _ from "underscore";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../api/services");

export default class MidwifeModal extends Component {
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
      health_facility: null,
      health_facilities: [],
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  submit(e) {
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      loading: true
    });
    alertifyjs.message("Adding Midwife..", 2, function() {});
    service.addUser(
      {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        gender: this.state.gender,
        health_facility: this.state.health_facility,
        password: this.state.password,
        phone: this.state.phone_number,
        role: "midwife"
      },
      function(error, token) {
        if (error) {
          thisApp.setState({
            loading: false
          });
          alertifyjs.error("Request failed, try again", 5, function() {});
        } else {
          thisApp.setState({
            loading: false
          });
          alertifyjs.success("Added successfully", 2, function() {});
          window.location.reload();
        }
      }
    );
  }
  getHealthFacilities() {
    const thisApp = this;
    thisApp.setState({
      health_facilities: [],
      health_facilities_copy: [],
      loadingText: "Loading..."
    });
    service.getHealthFacilities(function(error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          health_facilities: []
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          health_facilities: response.results
        });
      }
    });
  }
  componentDidMount() {
    this.getHealthFacilities();
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleClose("midwife")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new Midwife</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={e => this.submit(e)}>
            <div className='col-md-12'>
              <div className='form-group col-md-6'>
                <label>First name</label>
                <input
                  required
                  type='text'
                  onChange={this.handleChange}
                  name='first_name'
                  value={this.state.first_name}
                  className='form-control'
                  placeholder='John'
                  autoFocus={true}
                ></input>
              </div>
              <div className='form-group col-md-6'>
                <label>Last name</label>
                <input
                  required
                  type='text'
                  onChange={this.handleChange}
                  name='last_name'
                  value={this.state.last_name}
                  className='form-control'
                  placeholder='Musoke'
                ></input>
              </div>
              <div className='form-group col-md-6'>
                <label>Phone number</label>
                <input
                  required
                  type='tel'
                  onChange={this.handleChange}
                  name='phone_number'
                  value={this.state.phone_number}
                  className='form-control'
                  placeholder='070XXXXXX'
                ></input>
              </div>
              <div className='form-group col-md-6'>
                <label>Gender</label>
                <select
                  required
                  className='form-control'
                  name='gender'
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
              <div className='form-group col-md-6'>
                <label>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder='jmusoke@gmail.com'
                ></input>
              </div>
              <div className='form-group col-md-6'>
                <label>Username</label>
                <input
                  required
                  type='text'
                  className='form-control'
                  name='username'
                  onChange={this.handleChange}
                  value={this.state.username}
                  placeholder='jmusoke'
                ></input>
              </div>

              <div className='form-group col-md-6'>
                <label>Password</label>
                <input
                  required
                  className='form-control'
                  name='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                  type='password'
                  placeholder='Password'
                ></input>
              </div>
            </div>
            <div className='col-md-12'>
              <br className='clear-both' />
              <div className='form-group col-md-6'>
                <label>Health facility</label>
                <select
                  className='form-control'
                  name='health_facility'
                  onChange={this.handleChange}
                  value={this.state.health_facility}
                >
                  <option defaultValue value={null}>
                    Select Health Facility
                  </option>
                  {this.state.health_facilities.map((value, key) => (
                    <option key={key} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <br className='clear-both' />
              <button type='submit' className='btn btn-primary'>
                {this.state.loading ? "Adding Midwife" : "Submit"}
              </button>
              <br className='clear-both' />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-default'
            onClick={() => this.props.handleClose("midwife")}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

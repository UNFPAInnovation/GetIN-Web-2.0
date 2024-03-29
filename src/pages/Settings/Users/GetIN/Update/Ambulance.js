import React, { Component } from "react";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../../../api/services");


export default class AmbulanceModal extends Component {
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
      number_plate: null,
      parish: null,
      parishes: [],
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
    alertifyjs.message("Adding Ambulance..", 2, function() {});
    service.addUser(
      {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        gender: this.state.gender,
        parish: this.state.parish,
        number_plate: this.state.number_plate,
        password: this.state.password,
        phone: this.state.phone_number,
        role: "ambulance"
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
          alertifyjs.success("Added successfully", 3, function() {});
          window.location.reload();
        }
      }
    );
  }
  getParishes() {
    const thisApp = this;
    thisApp.setState({
      parishes: [],
      parishes_copy: [],
      loadingText: "Loading..."
    });
    service.getParishes(function(error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          health_facilities: []
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          parishes: response.results
        });
      }
    });
  }
  componentDidMount() {
    this.getParishes();
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleClose("ambulance")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new Ambulance</Modal.Title>
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
              <div className='form-group col-md-6'>
                <label>Number plate</label>
                <input
                  required
                  className='form-control'
                  name='number_plate'
                  onChange={this.handleChange}
                  value={this.state.number_plate}
                  type='text'
                  placeholder='Number plate'
                ></input>
              </div>
            </div>
            <div className='col-md-12'>
              <br className='clear-both' />
              <div className='form-group col-md-6'>
                <label>Parish</label>
                <select
                  className='form-control'
                  name='parish'
                  onChange={this.handleChange}
                  value={this.state.parish}
                >
                  <option defaultValue value={null}>
                    Select Parish
                  </option>
                  {this.state.parishes.map((value, key) => (
                    <option key={key} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <br className='clear-both' />
              <button type='submit' className='btn btn-primary'>
                {this.state.loading ? "Adding Ambulance" : "Submit"}
              </button>
              <br className='clear-both' />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-default'
            onClick={() => this.props.handleClose("ambulance")}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

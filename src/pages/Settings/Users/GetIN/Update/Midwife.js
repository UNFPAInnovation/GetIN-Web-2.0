import React, { Component } from "react";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../../../api/services");


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
      loading: false,
      fieldUpdate:false,
      disableEdit:true
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
  }

  enableEdit(){
    this.setState({
      disableEdit:false
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  submit(e) {
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      loading: true,
    });
    alertifyjs.message("Adding Midwife..", 2, function () {});
    service.updateUser(
      this.state.id,
      {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        gender: this.state.gender,
        health_facility: this.state.health_facility,
        phone: this.state.phone_number,
      },
      function (error, token) {
        if (error) {
          thisApp.setState({
            loading: false,
          });
          alertifyjs.error("Request failed, try again", 5, function () {});
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
  getHealthFacilities() {
    const thisApp = this;
    thisApp.setState({
      health_facilities: [],
      health_facilities_copy: [],
      loadingText: "Loading...",
    });
    service.getHealthFacilities(function (error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          health_facilities: [],
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          health_facilities: response.results,
        });
      }
    });
  }
  updateStatus() {
    const thisApp = this;
    thisApp.setState({
      loading: true,
    });
    alertifyjs.message(
      `${this.state.is_active ? "Activating" : "Deactivating"}`,
      2,
      function () {}
    );
    service.updateUser(
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
    this.getHealthFacilities();
    const updateData = this.props.data;
    this.setState({
      id: updateData.id,
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      username: updateData.username,
      gender: updateData.gender,
      email: updateData.email,
      phone_number: updateData.phone,
      health_facility:updateData?.health_facility?.id,
      is_active: updateData.is_active,
    });
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleClose("midwife")}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-md-8">
              <Modal.Title>
                <span> Update Midwife</span>{" "}
              </Modal.Title>
            </div>
            <div className="col-md-4">
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
              <button
                className="btn btn-sm btn-success"
                style={{marginLeft:'10px'}}
                onClick={this.enableEdit}
              >
                {this.state.disableEdit?"Edit":"Editing"}
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => this.submit(e)}>
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
                  disabled={this.state.disableEdit}
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
                  disabled={this.state.disableEdit}
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
                  disabled={this.state.disableEdit}
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
                  disabled={this.state.disableEdit}
                >
                  <option defaultValue value={null}>
                    Select gender
                  </option>
                  <option value={"female"}>Female</option>
                  <option value={"male"}>Male</option>
                </select>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group col-md-6">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="jmusoke@gmail.com"
                  disabled={this.state.disableEdit}
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
                  disabled={this.state.disableEdit}
                ></input>
              </div>
            </div>
            <div className="col-md-12">
              <br className="clear-both" />
              <div className="form-group col-md-6">
                <label>Health facility</label>
                <select
                  className="form-control"
                  name="health_facility"
                  onChange={this.handleChange}
                  value={this.state.health_facility}
                  disabled={this.state.disableEdit}
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
              <br className="clear-both" />
              <button type="submit" className="btn btn-primary">
                {this.state.loading ? "Updating Midwife" : "Update"}
              </button>
              <br className="clear-both" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-default"
            onClick={() => this.props.handleClose("midwife")}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

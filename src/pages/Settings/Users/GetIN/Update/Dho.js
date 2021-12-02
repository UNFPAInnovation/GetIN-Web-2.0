import React, { Component } from "react";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../../../api/services");

export default class DhoModal extends Component {
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
      county: null,
      district:null,
      villages: [],
      villages_copy: [],
      subcounties: [],
      parishes: [],
      parish:null,
      loading: false,
      is_active: true,
      fieldUpdate:false,
      disableEdit:true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.handleCountyChange = this.handleCountyChange.bind(this);
    this.handleSubCountyChange = this.handleSubCountyChange.bind(this);
    this.handleParishChange = this.handleParishChange.bind(this);
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
    this.setState(
      {
        [name]: value,
      },
      function () {
        
      }
    );
  }
  handleDistrictChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    const index = target.selectedIndex;
    const optionElement = target.childNodes[index];
    const optionId = optionElement.getAttribute("id");
    this.getCountiesByDistrict(optionId);
  }

  handleCountyChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    const index = target.selectedIndex;
    const optionElement = target.childNodes[index];
    const optionId = optionElement.getAttribute("id");
    this.getSubCountiesByCounty(optionId);
  }

  handleSubCountyChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    const index = target.selectedIndex;
    const optionElement = target.childNodes[index];
    const optionId = optionElement.getAttribute("id");
    this.getParishBySubCounty(optionId);
  }

  handleParishChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    const index = target.selectedIndex;
    const optionElement = target.childNodes[index];
    const optionId = optionElement.getAttribute("id");
    this.getVillagesByParish(optionId);
  }

  submit(e) {
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      loading: true,
    });
    alertifyjs.message("Updating DHO..", 2, function () {});
    service.updateUser(
      this.state.id,
      {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        gender: this.state.gender,
        village: parseInt(this.state.village),
        phone: this.state.phone_number,
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
  getDistricts() {
    const thisApp = this;
    service.getDistricts(function (error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          districts: [],
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          districts: response.results
        });
      }
    });
  }
  getParishBySubCounty(id) {
    const thisApp = this;
    service.getParishBySubCounty(id, function (error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          parishes: [],
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          parishes: response.results,
        });
      }
    });
  }
  getSubCountiesByCounty(id) {
    const thisApp = this;
    service.getSubCountiesByCounty(id, function (error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          subcounties: [],
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          subcounties: response.results,
        });
      }
    });
  }
  getVillagesByParish(id){
    const thisApp = this;
    service.getVillagesByParish(id, function (error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          villages: [],
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          villages: response.results,
        });
      }
    });
  }

  getCountiesByDistrict(id) {
    const thisApp = this;
    service.getCountiesByDistrict(id, function (error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          counties: [],
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          counties: response.results,
        });
      }
    });
  }
  componentDidMount() {
    this.getDistricts();
    const updateData = this.props.data;
    this.setState({
      id: updateData.id,
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      username: updateData.username,
      gender: updateData.gender,
      email: updateData.email,
      phone_number: updateData.phone,
      district: updateData.village.parish.sub_county.county.district.name,
      is_active: updateData.is_active,
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
            <div className="col-md-8">
              <Modal.Title>
                <span> Update DHO</span>{" "}
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
                <label>District</label>
                <select
                  required
                  className="form-control"
                  name="district"
                  onChange={this.handleDistrictChange}
                  value={this.state.district}
                  disabled={this.state.disableEdit}
                >
                  <option defaultValue value={null}>
                    {this.state.district?this.state.district:"Select District"}
                  </option>
                  {this.state.districts
                    ? this.state.districts.map((district) => {
                        return (
                          <option
                            key={district.id}
                            id={district.id}
                            defaultValue
                            value={district.id}
                          >
                            {district.name}
                          </option>
                        );
                      })
                    : "Loading ..."}
                </select>
              </div>

              {(this.state.district && !this.state.disableEdit) && (
                <div className="form-group col-md-6">
                  <label>County</label>
                  <select
                    required
                    className="form-control"
                    name="county"
                    onChange={this.handleCountyChange}
                    value={this.state.county}
                  >
                    <option defaultValue value={null}>
                      Select County
                    </option>
                    {this.state.counties
                      ? this.state.counties.map((county) => {
                          return (
                            <option
                              key={county.id}
                              id={county.id}
                              defaultValue
                              value={county.id}
                            >
                              {county.name}
                            </option>
                          );
                        })
                      : "Loading ..."}
                  </select>
                </div>
              )}

              {this.state.county && (
                <div className="form-group col-md-6">
                  <label>Subcounty</label>
                  <select
                    required
                    className="form-control"
                    name="subcounty"
                    onChange={this.handleSubCountyChange}
                    value={this.state.subcounty}
                  >
                    <option defaultValue value={null}>
                      Select Subcounty
                    </option>
                    {this.state.subcounties
                      ? this.state.subcounties.map((subcounty) => {
                          return (
                            <option
                              key={subcounty.id}
                              defaultValue
                              id={subcounty.id}
                              value={subcounty.id}
                            >
                              {subcounty.name}
                            </option>
                          );
                        })
                      : "Loading ..."}
                  </select>
                </div>
              )}
              {this.state.subcounty && (
                <div className="form-group col-md-6">
                  <label>Parish</label>
                  <select
                    required
                    className="form-control"
                    name="parish"
                    onChange={this.handleParishChange}
                    value={this.state.parish}
                  >
                    <option defaultValue value={null}>
                      Select Parish
                    </option>
                    {this.state.parishes
                      ? this.state.parishes.map((parish) => {
                          return (
                            <option
                              key={parish.id}
                              id={parish.id}
                              defaultValue
                              value={parish.id}
                            >
                              {parish.name}
                            </option>
                          );
                        })
                      : "Loading ..."}
                  </select>
                </div>
              )}

              {this.state.parish && (
                <div className="form-group col-md-6">
                  <label>Village</label>
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
                    {this.state.villages
                      ? this.state.villages.map((village) => {
                          return (
                            <option
                              key={village.id}
                              defaultValue
                              value={village.id}
                            >
                              {village.name}
                            </option>
                          );
                        })
                      : "Loading ..."}
                  </select>
                </div>
              )}

              <br className="clear-both" />
              <br className="clear-both" />
              <button type="submit" className="btn btn-primary">
                {this.state.loading ? "Updating DHO" : "Update"}
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

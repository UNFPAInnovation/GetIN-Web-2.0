import React, { Component } from "react";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../api/services");

export default class HealthFacilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facilityName: '',
      facilityLevel: '',
      district: '',
      county:'',
      subCounty:'',
      districts:[],
      counties:[],
      subcounties:[],
      isLoading:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.addHealthFacilty = this.addHealthFacilty.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  getDistricts() {
    const thisApp = this;
    service.getDistricts(function(error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          districts: []
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          districts: response.results.filter((district)=> district.id !== 7 && district.id !== 4 && district.id !== 2 )
        });
      }
    });
  }

  getSubCounties() {
    const thisApp = this;
    service.getSubCounties(function(error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          subcounties: []
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          subcounties: response.results
        });
      }
    });
  }

  getCounties() {
    const thisApp = this;
    service.getSubCounties(function(error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true,
          counties: []
        });
      } else {
        thisApp.setState({
          isLoaded: true,
          counties: response.results
        });
      }
    });
  }

  addHealthFacilty(e) {
    e.preventDefault();
    const thisApp = this;
    service.addHealthFacility(
      {
        name: this.state.facilityName,
        sub_county_id: this.state.subCounty,
        facility_level: this.state.facilityLevel,
        district: this.state.district,
        county: this.state.county
      },
      function(error, response) {
      if (error) {
        thisApp.setState({
          isLoaded: true
        });
        alertifyjs.error("Request failed, try again ", function () {});
      } else {
        thisApp.setState({
          isLoaded: true
        });
        alertifyjs.success("Added successfully", 2, function () {});
        window.location.reload();
      }
    });
  }

  componentDidMount() {
    this.getDistricts();
    this.getSubCounties();
    this.getCounties();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleClose("modal")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new Health Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.addHealthFacilty}>
            <div className="col-md-12">
              <div className="form-group col-md-6">
                <label>Health Facility Name:</label>
                <input
                  required
                  type="text"
                  onChange={this.handleChange}
                  name="facilityName"
                  value={this.state.facilityName}
                  className="form-control"
                  placeholder="Facility HC II"
                  autoFocus={true}
                ></input>
              </div>

              <div className="form-group col-md-6">
                <label>Health Facility Level</label>
                <select
                  required
                  className="form-control"
                  name="facilityLevel"
                  onChange={this.handleChange}
                  value={this.facilityLevel}
                >
                  <option defaultValue value={null}>
                    Select Level
                  </option>
                  <option defaultValue value={'HC II'}>
                    HC II
                  </option>
                  <option defaultValue value={'HC III'}>
                    HC III
                  </option>
                  <option defaultValue value={'HC IV'}>
                    HC IV
                  </option> 
                </select>
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
                  onChange={this.handleChange}
                  value={this.state.district}
                >
                  <option defaultValue value={null}>
                    Select District
                  </option>
                  {this.state.districts?(this.state.districts.map(district=>{
                    return(
                      <option key={district.id} defaultValue value={district.name}>{district.name}</option>
                    )
                  })):'Loading ...'}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>Subcounty</label>
                <select
                  required
                  className="form-control"
                  name="subCounty"
                  onChange={this.handleChange}
                  value={this.state.subCounty}
                >
                  <option defaultValue value={null}>
                    Select Subcounty
                  </option>
                  {this.state.subcounties?(this.state.subcounties.map(subcounty=>{
                    return(
                      <option key={subcounty.id} defaultValue value={subcounty.id}>{subcounty.name}</option>
                    )
                  })):'Loading ...'}
                </select>
              </div>
              
              <div className="form-group col-md-6">
                <label>County</label>
                <select
                  required
                  className="form-control"
                  name="county"
                  onChange={this.handleChange}
                  value={this.state.county}
                >
                  <option defaultValue value={null}>
                    Select County
                  </option>
                  {this.state.counties?this.state.counties.map(county=>{
                    return(
                      <option key={county.id} defaultValue value={county.name}>{county.name}</option>
                    )
                  }):'Loading ...'}
                </select>
              </div>
              
              <br className="clear-both" />
              <div className="row">
                <div className="col-md-offset-9 col-md-2">
                  <button type="submit" className="btn btn-primary">
                    {"Submit"}
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

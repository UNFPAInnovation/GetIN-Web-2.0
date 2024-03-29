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
    this.handleDistrictChange = this.handleDistrictChange.bind(this);
    this.handleCountyChange = this.handleCountyChange.bind(this);
    this.formatHealthFacilityName = this.formatHealthFacilityName.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleDistrictChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    const index = target.selectedIndex;
    const optionElement = target.childNodes[index]
    const optionId =  optionElement.getAttribute('id');
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
    const optionElement = target.childNodes[index]
    const optionId =  optionElement.getAttribute('id');
    this.getSubCountiesByCounty(optionId);
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
          districts: response.results
        });
      }
    });
  }

  getSubCountiesByCounty(id) {
    const thisApp = this;
    service.getSubCountiesByCounty(id,
      function(error, response) {
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

  getCountiesByDistrict(id) {
    const thisApp = this;
    service.getCountiesByDistrict(id,function(error, response) {
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

  formatHealthFacilityName(facilityName,facilityLevel){
    if(facilityName.split(' ').length !== 1) return facilityName;
    let level = '';
    switch(facilityLevel){
      case '0':
        level  = 'Hospital'
        break
      case '2':
        level = 'HC II'
        break
      case '3':
        level = 'HC III'
        break
      case '4':
        level = 'HC IV'
        break
      default:
        level = ''
    }
    sessionStorage.setItem('Facility', `${facilityName} ${level}`.trim());
    return `${facilityName} ${level}`.trim();
  }

  addHealthFacilty(e) {
    e.preventDefault();
    const thisApp = this;
    service.addHealthFacility(
      {
        name: this.formatHealthFacilityName(this.state.facilityName,this.state.facilityLevel),
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
                  placeholder="Facility"
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
                  <option defaultValue value={'2'}>
                    HC II
                  </option>
                  <option defaultValue value={'3'}>
                    HC III
                  </option>
                  <option defaultValue value={'4'}>
                    HC IV
                  </option> 
                  <option defaultValue value={'0'}>
                    Hospital
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
                  onChange={this.handleDistrictChange}
                  value={this.state.district}
                >
                  <option defaultValue value={null}>
                    Select District
                  </option>
                  {this.state.districts?(this.state.districts.map(district=>{
                    return(
                      <option key={district.id} id={district.id} defaultValue value={district.name}>{district.name}</option>
                    )
                  })):'Loading ...'}
                </select>
              </div>

              {
                this.state.district && (
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
                      {this.state.counties?this.state.counties.map(county=>{
                        return(
                          <option key={county.id} id={county.id} defaultValue value={county.name}>{county.name}</option>
                        )
                      }):'Loading ...'}
                    </select>
                  </div>
                )
              }  

              {this.state.county && (
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
                )
              }    
              
              
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

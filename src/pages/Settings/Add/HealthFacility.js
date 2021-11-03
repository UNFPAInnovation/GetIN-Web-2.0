import React, { Component } from "react";
import _ from "underscore";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../api/services");

export default class HealthFacilityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {

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
          <form>
            <div className="col-md-12">
              <div className="form-group col-md-6">
                <label>Health Facility Name:</label>
                <input
                  required
                  type="text"
                //   onChange={/*No function yet*/}
                  name="FacilityName"
                //   value={'Facility Name'}
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
                  name="district"
                //   onChange={/*No function yet*/}
                //   value={'Level'}
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
                <label>Midwife</label>
                <select
                  required
                  className="form-control"
                  name="midwife"
                //   onChange={/*No function yet*/}
                //   value={'midwife'}
                >
                  <option defaultValue value={null}>
                    Select Midwife
                  </option>
                  {/* Map array of midwives */}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>District</label>
                <select
                  required
                  className="form-control"
                  name="district"
                //   onChange={/*No function yet*/}
                //   value={'district'}
                >
                  <option defaultValue value={null}>
                    Select District
                  </option>
                  {/*Map array of districts*/}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>Subcounty</label>
                <select
                  required
                  className="form-control"
                  name="subCounty"
                //   onChange={/*No function yet*/}
                //   value={'subCounty'}
                >
                  <option defaultValue value={null}>
                    Select Subcounty
                  </option>
                  {/*Map array of subcounties*/}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>Village</label>
                <select
                  required
                  className="form-control"
                  name="Village"
                //   onChange={/*No function yet*/}
                //   value={'village'}
                >
                  <option defaultValue value={null}>
                    Select Village
                  </option>
                  {/*Map array of villages*/}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>VHT's</label>
                <select
                  required
                  className="form-control"
                  name="VHT's"
                //   onChange={/*No function yet*/}
                //   value={'vhts'}
                >
                  <option defaultValue value={null}>
                    Select VHT's
                  </option>
                  {/*Map array of VHT's*/}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>County</label>
                <select
                  required
                  className="form-control"
                  name="county"
                //   onChange={/*No function yet*/}
                //   value={'county'}
                >
                  <option defaultValue value={null}>
                    Select County
                  </option>
                  {/*Map array of counties*/}
                </select>
              </div>

              <div className="form-group col-md-6">
                <label>Parish</label>
                <select
                  required
                  className="form-control"
                  name="parish"
                //   onChange={/*No function yet*/}
                //   value={'parish'}
                >
                  <option defaultValue value={null}>
                    Select Parish
                  </option>
                  {/*Map array of parishes*/}
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

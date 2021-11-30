import React, { Component } from "react";
import { Modal } from "react-bootstrap";
const alertifyjs = require("alertifyjs");
const service = require("../../../api/services");

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      new_password: null,
      current_password: null,
      loading: false
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
        
      }
    );
  }

  submit(e) {
    e.preventDefault();
    const thisApp = this;
    thisApp.setState({
      loading: true,
    });
    alertifyjs.message("Changing Password ..", 2, function () {});
    service.changePassword(
      {
        current_password: this.state.current_password,
        new_password: this.state.new_password
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
 
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.handleClose()}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-md-10">
              <Modal.Title>
                <span> Reset Password </span>{" "}
              </Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => this.submit(e)}>
            <div className="col-md-12">
              <br className="clear-both" />
              <br className="clear-both" />
              <br className="clear-both" />
              <br className="clear-both" />
              <div className="form-group col-md-6">
                <label>Current Password</label>
                <input
                  required
                  type="password"
                  onChange={this.handleChange}
                  name="current_password"
                  value={this.state.current_password}
                  className="form-control"
                  placeholder="Enter your current password"
                  autoFocus={true}
                ></input>
              </div>
              <div className="form-group col-md-6">
                <label>New Password</label>
                <input
                  required
                  type="password"
                  onChange={this.handleChange}
                  name="new_password"
                  value={this.state.new_password}
                  className="form-control"
                  placeholder="Enter new password"
                ></input>
              </div>
            </div>
            <div className="col-md-12">
              <br className="clear-both" />
              <br className="clear-both" />
              <button type="submit" className="btn btn-primary">
                {this.state.loading ? "Changing Password" : "Reset"}
              </button>
              <br className="clear-both" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-default"
            onClick={() => this.props.handleClose()}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

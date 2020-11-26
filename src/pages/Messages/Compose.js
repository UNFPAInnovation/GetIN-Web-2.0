import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Select from 'react-select';
const service = require("../../api/services");
const alertifyjs = require("alertifyjs");


export default class ComposeModal extends Component{
    constructor(props){
      super(props);
      this.state = {
        receiver_ids:[],
        message:null,
        options:[],
        selectedOption: null,
        loading: false
      }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    handleChangeSelect = selectedOption => {
      this.setState(
        { selectedOption }
      );
    };
    submit(e){
      e.preventDefault();
      const thisApp = this;
      thisApp.setState({
        loading:true
      });
      alertifyjs.message('Sending message ..', 2, function(){ });
      let ids = [];
      this.state.selectedOption.map((v,k)=>
        ids.push(v.value)
      );
      service.sendSms({
        receiver_ids:ids,
        message:this.state.message,
      }, function(error, token){
          if (error){
              thisApp.setState({
                loading:false
              });
              alertifyjs.error('Request failed, try again', 5, function(){ });
            }
            else{
              thisApp.setState({
                loading:false
              });
             alertifyjs.success('Message sent..', 2, function(){});
             window.location.reload();
            }
      });
    }
    getData() {
      const thisApp = this;
      service.getAllUsers(function(error, response){
        if (error){
            thisApp.setState(
            {
              isLoaded: true,
              users:[],
              options:[]
            }
          );
          }
          else{
            let options =[];
            response.results.map((v, k)=>
              options.push({"value":v.id, "label":v.first_name+" "+v.last_name+" - "+v.phone+" ("+v.role+")"})
            )
            thisApp.setState(
            {
              isLoaded: true,
              users:response.results,
              options:options
            }
          );
          }
    });
  
  }
    componentDidMount(){
      this.getData();
    }
    render(){
      const { selectedOption } = this.state;
      const options = this.state.options;
  
      return(
        <Modal show={this.props.show} onHide={()=>this.props.handleClose("midwife")}>
          <Modal.Header closeButton>
            <Modal.Title>Send new Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={e =>this.submit(e)}>
            <div className="col-md-12">
                <div className="form-group col-md-6">
                    <label>To</label>
                    <Select
                    isMulti
          value={selectedOption}
          onChange={this.handleChangeSelect}
          options={options}
          placeholder="Select users"
        />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group col-md-6">
                    <label>Message</label>
                    <textarea rows="5" value={this.state.message} onChange={this.handleChange} className="form-control" name="message" placeholder="Type your message here"></textarea>
                </div>
            </div>
        <div className="col-md-12">
        <div className="form-group col-md-6">
                
                    <button type="submit" className="btn btn-primary">{this.state.loading ? "Sending message" : "Submit"}</button>
                    <br className="clear-both"/>
                    </div></div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={()=>this.props.handleClose("compose")}>Close</button>
          </Modal.Footer>
        </Modal>
      )
    }
  }
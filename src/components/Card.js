import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default class Card extends Component {
  render() {
    return (
      <div className={"card " + this.props.color}>
        <span>
          <FontAwesomeIcon icon={this.props.icon} />
        </span>
        <h5>{this.props.title}</h5>
        <h4>{this.props.number}</h4>
        <span className="rate">
          <FontAwesomeIcon
            icon={this.props.direction === "up" ? faArrowUp : faArrowDown}
          />
          {this.props.rate}
        </span>
      </div>
    );
  }
}

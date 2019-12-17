import React from "react";
export default function Check(props) {
      return (
          <div className="checkboxWrapper">
            <div className="disabler"></div>
            {props.state === false ? (
              <input type="checkbox" checked={true} />
            ) : (
              <input type="checkbox" checked={false} />
            )}
          </div>
      )
  }
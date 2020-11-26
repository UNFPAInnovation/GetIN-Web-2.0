import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { dateFormatter, trimesterFormatter } from "../../utils/index";

const ExpandableTable = ({ data }) => {
  if (data) {
    return (
      <BootstrapTable data={data}>
        <TableHeaderColumn dataField='id' hidden={true} isKey={true}>
          #id
        </TableHeaderColumn>
        <TableHeaderColumn width='340px'></TableHeaderColumn>
        <TableHeaderColumn dataField='timester' dataFormat={trimesterFormatter}>
          Timester
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={dateFormatter} dataField='date'>
          Date
        </TableHeaderColumn>
      </BootstrapTable>
    );
  } else {
    return <p>?</p>;
  }
};

export default ExpandableTable;

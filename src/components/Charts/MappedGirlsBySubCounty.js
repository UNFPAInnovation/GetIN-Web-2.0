
import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
const service = require('../../api/services');

const subCountyData = {
    // labels: ['Adumi', 'Opa', 'Inde'],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Adumi',
        data: [100,
            150,
            200,
            250,
            300,
            350,
            400,
            450,
            500,
            550,
            0,
            0],
        backgroundColor:'#FF7043',
        hoverBackgroundColor:'#FFAB91'        
      },
      {
        label: 'Opa',
        data: [344,	545,	943,	158,	469,	248,	278,	307,	325,	4,	0,	0],
        backgroundColor:'#C70039',
        hoverBackgroundColor:'#C70039'
      },
      {
        label: 'Inde',
        data: [100,
            150,
            200,
            450,
            300,
            350,
            400,
            450,
            300,
            550,
            0,
            0],
        backgroundColor:'#FFC300',
        hoverBackgroundColor:'#FFC300'
        
      }
    ]
  }

  export default class MappedGirlsBySubCounty extends React.Component {
    render(){
        return(
            <React.Fragment>
            <Bar
          data={subCountyData}
          width={100}
          height={400}
          options={{
            maintainAspectRatio: false
          }}
        />
        </React.Fragment>
        );
    }

  }
import React, {Component} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Drilldown from 'highcharts/modules/drilldown.js';

import ChartCard from '../../../../components/ChartCard';
import { GlobalContext } from '../../../../context/GlobalState';


class MappedGirlsPerDistrictBarChartCard extends Component {

    static contextType = GlobalContext;

    constructor(props){
        super(props);
        this.state = {
            districtData:{},
            subCountyData:[],
            isLoaded:false
        }
    }
  
    render(){
        if(this.props.data && !this.state.isLoaded){
          
          let newData = this.props.data;
          newData = newData.filter((unit)=> unit.district !== 'Kampala' && unit.district !== 'Arua' && unit.district !== 'BUNDIBUGYO' );

          let aggregatedData = {};
          newData.forEach((unit)=>{
            aggregatedData[unit.district]?aggregatedData[unit.district]['y']+=unit.count:aggregatedData[unit.district] = {name:unit.district,y:unit.count,drilldown:unit.district.toLowerCase()}
          })
          
          let aggregateSubcountyData = {};
          
          newData.forEach((unit)=>{
            if(aggregateSubcountyData[unit.district]){
              unit['subcounties'].forEach((subcounty)=>{
                for(let obj of aggregateSubcountyData[unit.district]){
                  if(obj.hasOwnProperty(`totalNumberOfGirlsMappedFrom${subcounty}`) && unit.hasOwnProperty(`totalNumberOfGirlsMappedFrom${subcounty}` )){
                    obj[`totalNumberOfGirlsMappedFrom${subcounty}`] += unit[`totalNumberOfGirlsMappedFrom${subcounty}`]
                  }
                }
              });
              
            }else{
              aggregateSubcountyData[unit.district] = unit['subcounties'].map((subcounty)=>{
                  return {[`totalNumberOfGirlsMappedFrom${subcounty}`]: unit.hasOwnProperty(`totalNumberOfGirlsMappedFrom${subcounty}` )?unit[`totalNumberOfGirlsMappedFrom${subcounty}`]:0} 
                })
            }
          })

          // ----------------------------------------

          let subCountyDataArray = []

          for(let district of Object.keys(aggregateSubcountyData)){
              let newarr = aggregateSubcountyData[district].map((subcounty)=>{
                  let [key,] = Object.entries(subcounty);
                  return [key[0].replace(/totalNumberOfGirlsMappedFrom/,''),key[1]]
              })
              subCountyDataArray.push({name:'Women',id:district.toLowerCase(),data:newarr})
          }

          this.setState({subCountyData:subCountyDataArray});
          this.setState({districtData:aggregatedData});
          this.setState({isLoaded:true});
        }
        
        return(
          
            <>
                {this.state.isLoaded?(
                    <ChartCard
                    title={"Mapped women per district"}
                    content={
                        <HighchartsReact
                            highcharts={Drilldown(Highcharts)}
                            options={{
                              chart: {
                                type: 'column'
                              },
                              yAxis: {
                                min: 0,
                                title: {
                                  text: 'Total number of women mapped'
                                }
                              },
                              xAxis:{
                                type: 'category'
                              },
                              legend:{
                                enabled:false
                              },
                              title: {
                                text: ''
                              },
                              series: [{
                                name:'Women',
                                colorByPoint:true,
                                data: this.state.isLoaded && Object.values(this.state.districtData)
                              }],
                              plotOptions: {
                                column: {
                                  pointPadding: 0.2,
                                  borderWidth: 0,
                                  minPointLength: 3,
                                  pointWidth: 5,
                                  shadow: false
                                }
                              },
                              drilldown: {
                                allowPointDrilldown: false,
                                xAxis: 0,
                                series: this.state.isLoaded && this.state.subCountyData
                              }
                          }}
                        />
                    }
                />
                ):"Loading..."}
            </>
        )
    }   
}

export default MappedGirlsPerDistrictBarChartCard;

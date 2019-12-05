// Util functions
import {
  aggregateSubcountyData,
  getMonthCount,
  getMonths
} from './utils/utils';

const MappedGirlsPerSubcountyBarChart = data => {
  const months = getMonths(data);
  const totalGirlsMappedObject = getMonthCount(data, months);
  const subcountyDataObject = aggregateSubcountyData(data);
  const district = [...new Set(data.map(month => month.district))];

  let chart = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total number of girls mapped from ' + district
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        minPointLength: 3,
        pointWidth: 4,
        shadow: false
      }
    },

    series: [totalGirlsMappedObject],
    drilldown: {
      allowPointDrilldown: false,
      xAxis: 0,
      series: subcountyDataObject
    }
  };
  return chart;
};

export { MappedGirlsPerSubcountyBarChart };

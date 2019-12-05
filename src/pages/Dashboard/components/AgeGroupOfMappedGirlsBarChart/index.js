import React, { useState, useMemo } from 'react';

// Chart Stuff
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Chart componets
import { Bar } from 'react-chartjs-2';

// Chart Card Component
import ChartCard from '../../../../components/ChartCard';

// Chart + Chart Data
import { AgeGroupOfMappedGirlsPieChart } from '../../../../components/Charts/AgeGroupOfMappedGirlsPieChart';

const AgeGroupOfMappedGirlsPieChartCard = ({ data }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(AgeGroupOfMappedGirlsPieChart(data));
    }
  }, [data]);

  return (
    <ChartCard
      title={'Age group of mapped girls'}
      content={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
    />
  );
};

export default AgeGroupOfMappedGirlsPieChartCard;

import React, { useState, useMemo } from 'react';

// Chart componets
import { Bar } from 'react-chartjs-2';

// Chart options
import { options } from '../../../../components/Charts/chartOptions';

// Chart + Chart Data
import { AgeGroupOfMappedGirlsBarChart } from '../../../../components/Charts/AgeGroupOfMappedGirlsBarChart';

const AgeGroupOfMappedGirlsBarChartCard = ({ data }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(AgeGroupOfMappedGirlsBarChart(data));
    }
  }, [data]);

  return (
    <div className='col-md-12'>
      <Bar data={chart} width={100} height={400} options={options} />
    </div>
  );
};

export default AgeGroupOfMappedGirlsBarChartCard;

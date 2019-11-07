import React, { useState, useMemo } from 'react';

// Chart componets
import { Bar } from 'react-chartjs-2';

// Chart Card Component
import ChartCard from '../../../../components/ChartCard';

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
    <ChartCard
      title={'Age group of mapped girls'}
      content={<Bar data={chart} width={100} height={400} options={options} />}
    />
  );
};

export default AgeGroupOfMappedGirlsBarChartCard;

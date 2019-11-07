import React, { useState, useMemo } from 'react';

// Chart componets
import { Bar } from 'react-chartjs-2';

// Chart Card Component
import ChartCard from '../../../../components/ChartCard';

// Chart options
import { options } from '../../../../components/Charts/chartOptions';

// Chart + Chart Data
import { MappedGirlsPerSubcountyBarChart } from '../../../../components/Charts/MappedGirlsPerSubcountyBarChart';

const MappedGirlsPerSubcountyBarChartCard = ({ data }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(MappedGirlsPerSubcountyBarChart(data));
    }
  }, [data]);

  return (
    <ChartCard
      title={'Mapped girls per subcounty'}
      content={<Bar data={chart} width={100} height={400} options={options} />}
    />
  );
};

export default MappedGirlsPerSubcountyBarChartCard;

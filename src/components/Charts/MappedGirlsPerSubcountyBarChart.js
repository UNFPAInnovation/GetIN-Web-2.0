// Import utility functions
import { aggregateAgesByMonth, getMonths } from './utils/utils';

// Import subcounties
import { BUNDIBUGYO_SUBCOUNTIES } from '../../constants/subcounties';

const MappedGirlsPerSubcountyBarChart = data => {
  let months = getMonths(data);

  const BUBANDI = aggregateAgesByMonth(
    data,
    months,
    'totalNumberOfGirlsMappedFromBUBANDI'
  );

  console.log(BUBANDI);

  return {
    labels: [...months],
    datasets: [
      {
        label: 'BUBANDI',
        backgroundColor: '#A4A1FB',
        data: BUBANDI
      }
    ]
  };
};

export { MappedGirlsPerSubcountyBarChart };

// Import utility functions
import { aggregateAgesByMonth, getMonths } from './utils/utils';

// Import chart colors

const AgeGroupOfMappedGirlsBarChart = data => {
  const months = getMonths(data);

  const mappedGirlsInAgeGroup12_15 = aggregateAgesByMonth(
    data,
    months,
    'mappedGirlsInAgeGroup12_15'
  );

  const mappedGirlsInAgeGroup16_19 = aggregateAgesByMonth(
    data,
    months,
    'mappedGirlsInAgeGroup16_19'
  );

  const mappedGirlsInAgeGroup20_24 = aggregateAgesByMonth(
    data,
    months,
    'mappedGirlsInAgeGroup20_24'
  );

  return {
    labels: ['12-15', '16-19', '20-24'],
    datasets: [
      {
        label: 'Mapped girls',
        data: [
          mappedGirlsInAgeGroup12_15.reduce((a, b) => a + b, 0),
          mappedGirlsInAgeGroup16_19.reduce((a, b) => a + b, 0),
          mappedGirlsInAgeGroup20_24.reduce((a, b) => a + b, 0)
        ],
        backgroundColor: ['#4CC4D4', '#4BD4B8', '#5561D5'],
        hoverBackgroundColor: ['#7cddea', '#4BD4B8', '#7480ed']
      }
    ]
  };
};

export { AgeGroupOfMappedGirlsBarChart };

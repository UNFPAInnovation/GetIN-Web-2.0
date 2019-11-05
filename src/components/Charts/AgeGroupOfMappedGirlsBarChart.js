// Import utility functions

// Import chart colors

const AgeGroupOfMappedGirlsBarChart = data => {
  return {
    labels: ['12-15', '16-19', '20-24'],
    datasets: [
      {
        label: 'Mapped girls',
        data: [
          data.results.mappedGirlsInAgeGroup12_15,
          data.results.mappedGirlsInAgeGroup16_19,
          data.results.mappedGirlsInAgeGroup20_24
        ],
        backgroundColor: ['#4CC4D4', '#4BD4B8', '#5561D5'],
        hoverBackgroundColor: ['#7cddea', '#4BD4B8', '#7480ed']
      }
    ]
  };
};

export { AgeGroupOfMappedGirlsBarChart };

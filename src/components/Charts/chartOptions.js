const options = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 2,
          min: 0,
          max: 10
        },
        gridLines: {
          display: true
        }
      }
    ]
  }
};

export { options };

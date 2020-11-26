const options = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        barThickness: 6, // number (pixels) or 'flex'
        maxBarThickness: 8
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 2,
          min: 0
        },
        gridLines: {
          display: true
        }
      }
    ]
  }
};

export { options };

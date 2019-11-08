// Various utility functions for graphs

const getMonths = data => {
  // if (data.length === 1) {
  //   // One day chosen
  //   // let months = data.map(m => m._id.day + ' ' + m.month + ' ' + m.year);
  //   let months = data.map(m => m.month + ' ' + m.year);
  //   return months;
  // } else {
  // Period chosen
  let months = data.map(m => m.month + ' ' + m.year);

  // Return only unique months
  let uniqueMonths = [...new Set(months)];
  return uniqueMonths;
};

const aggregateAgesByMonth = (data, months, fieldToAggregate) => {
  let aggregateData = [];

  if (data.length === 1) {
    // Extract month date object parsed
    let returnedMonth = months[0].split(' ')[0];

    let dayTotal = data
      .filter(({ month }) => month === returnedMonth)
      .reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue[fieldToAggregate],
        0
      );
    aggregateData.push(dayTotal);
  } else {
    months.forEach(uniqueMonth => {
      // Month is returned with year as "January 2019"
      // To perform a match, we strip out the year (last 5 characters)
      let monthTotal = data
        .filter(({ month }) => month === uniqueMonth.slice(0, -5))
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue[fieldToAggregate],
          0
        );
      aggregateData.push(monthTotal);
    });
  }
  return aggregateData;
};

export { aggregateAgesByMonth, getMonths };

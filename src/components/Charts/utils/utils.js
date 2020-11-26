import { MappedGirlsPerSubcountyBarChart } from '../MappedGirlsPerSubcountyBarChart';

// Various utility functions for graphs

const getDistrict = data => {
  return [...new Set(data.map(month => month.district))];
};

const getMonths = data => {
  // Period chosen
  let months = data.map(m => m.month + ' ' + m.year);

  // Return only unique months
  let uniqueMonths = [...new Set(months)];
  return uniqueMonths;
};

const aggregateAgeForSingleMonth = (
  data,
  monthToAggregate,
  fieldToAggregate
) => {
  let monthTotal = data
    .filter(({ month }) => month === monthToAggregate)
    .reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue[fieldToAggregate] || 0,
      0
    );

  return monthTotal;
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

const getMonthCount = (data, months) => {
  const totalGirlsMappedObject = {
    name: 'Total girls mapped',
    colorByPoint: true,
    data: [] // Set it to an empty array to hold aggregated counts per month
  };

  months.forEach(month => {
    let returnedMonth = month.split(' ')[0];
    let count =
      data
        .filter(({ month }) => month === returnedMonth)
        .map(month => month.count) || 0;

    totalGirlsMappedObject['data'].push({
      name: month,
      y: count.reduce((a, b) => a + b, 0), // Since the map returns an array, we reduce it to get the total
      drilldown: month
    });
  });

  return totalGirlsMappedObject;
};

const aggregateSubcountyData = data => {
  /** Get subcounty data and construct an object for Highcharts
   * Format
   * series: [
   *   {
   *     name: subcountyname,
   *     id: month,
   *     data: [
   *       ['subcountyname', subcountyTotal]
   *     ]
   *   }
   *  ]
   */

  // Probably a performance hit with all the loops so marked for future improvement.
  const subcountyDataObject = [];

  data.map(month => {
    subcountyDataObject.push({
      name: month.month + ' ' + month.year,
      id: month.month + ' ' + month.year,
      data: [] // Set to empty so we can aggregate the subcounty data and push it as below
    });

    subcountyDataObject.forEach(uniqueMonth => {
      // To avoid appending months data to the first instance, check if our data array is empty or undefined.
      // Only push data if its empty ie its a new month
      if (uniqueMonth.data === undefined || uniqueMonth.data.length == 0) {
        month.subcounties.forEach(subcounty => {
          uniqueMonth['data'].push([
            subcounty,
            aggregateAgeForSingleMonth(
              data,
              month.month,
              `totalNumberOfGirlsMappedFrom${subcounty}`
            )
          ]);
        });
      }
    });
  });

  return subcountyDataObject;
};

export {
  aggregateAgesByMonth,
  aggregateSubcountyData,
  getDistrict,
  getMonthCount,
  getMonths
};

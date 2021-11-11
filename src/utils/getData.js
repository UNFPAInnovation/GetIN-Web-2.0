//  Custom function to collect all data required for the dashboard.
//  Writen as a react hook to take advantage of the useEffect hook

import { useState, useEffect } from 'react';

// Network stuff
const gSession = window.sessionStorage;
const token = gSession.getItem('token');
const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Token ' + token
  }
};

// Endpoints
const apiURL = require('../env_config').default;

export default function useGetData(fromFilter, toFilter, districtId) {
  // Currate all the api endpoints we querry for data / stats
  const followupsURL = `${apiURL}/api/v1/followups?created_from__gte=${fromFilter}&created_to__lte=${toFilter}${
    districtId && `&district=${districtId}`
  }`;
  const deliveriesURL = `${apiURL}/api/v1/deliveries?created_from__gte=${fromFilter}&created_to__lte=${toFilter}${
    districtId && `&district=${districtId}`
  }`;
  const mappingEncountersStatsURL = `${apiURL}/api/v1/mapping_encounters_stats?from=${fromFilter}&to=${toFilter}${
    districtId && `&district=${districtId}`
  }`;

  // Set initial state of our data
  const [isLoading, setIsLoading] = useState(false);
  const [followups, setFollowups] = useState(null);
  const [deliveries, setDeliveries] = useState(null);
  const [mappingEncountersStats, setMappingEncountersStats] = useState(null);

  // Fetch the data using useEffect. This allows us to mutate the data fetched based on a dependency,
  // In our case the filter. When the filter changes, we fetch new data.
  useEffect(() => {
    setIsLoading(true);

    // Construct functions for each request to retireve the data we want
    const followupsReq = async () => {
      const response = await fetch(followupsURL, DEFAULT_OPTIONS);
      return await response.json();
    };

    const deliveriesURLReq = async () => {
      const response = await fetch(deliveriesURL, DEFAULT_OPTIONS);
      return await response.json();
    };

    const mappingEncountersStatsURLReq = async () => {
      const response = await fetch(mappingEncountersStatsURL, DEFAULT_OPTIONS);
      return await response.json();
    };

    // Function to run all server requests in parallel and return a Promise if all resolve
    // Promise.all returns a new promise that resolves when all of its arguments resolve
    const getAllData = () => {
      return Promise.all([
        followupsReq(),
        deliveriesURLReq(),
        mappingEncountersStatsURLReq(),
      ]);
    };

    // When Promise reolves, all our data is available and we can set state appropriately
    getAllData().then(
      ([followups, deliveries, mappingEncountersStats, healthFacilities]) => {
        setFollowups(followups);
        setDeliveries(deliveries);
        setMappingEncountersStats(mappingEncountersStats);
        setIsLoading(false);
      }
    );
  }, [
    fromFilter,
    toFilter,
    followupsURL,
    deliveriesURL,
    mappingEncountersStatsURL,
  ]);

  return [
    {
      followups,
      deliveries,
      mappingEncountersStats,
      isLoading,
    },
  ];
}

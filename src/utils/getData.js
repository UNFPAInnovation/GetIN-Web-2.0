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

export default function useGetData(fromFilter, toFilter) {
  // Currate all the api endpoints we querry for data
  const followupsURL = `${apiURL}/api/v1/followups?created_from=${fromFilter}&created_to=${toFilter}`;
  const mappedGirlsURL = `${apiURL}/api/v1/mapping_encounters?created_from=${fromFilter}&created_to=${toFilter}`;
  const deliveriesURL = `${apiURL}/api/v1/deliveries?created_from=${fromFilter}&created_to=${toFilter}`;

  // Set initial state of our data
  const [isLoading, setIsLoading] = useState(false);
  const [followups, setFollowups] = useState(null);
  const [mappedGirls, setMappedGirls] = useState(null);
  const [deliveries, setDeliveries] = useState(null);

  // Fetch the data using useEffect. This allows us to mutate the data fetched based on a dependency,
  // In our case the filter. When the filter changes, we fetch new data.
  useEffect(() => {
    setIsLoading(true);

    // Construct functions for each request to retireve the data we want
    const followupsReq = async () => {
      const response = await fetch(followupsURL, DEFAULT_OPTIONS);
      return await response.json();
    };

    const mappedGirlsReq = async () => {
      const response = await fetch(mappedGirlsURL, DEFAULT_OPTIONS);
      return await response.json();
    };

    const deliveriesURLReq = async () => {
      const response = await fetch(deliveriesURL, DEFAULT_OPTIONS);
      return await response.json();
    };

    // Function to run all server requests in parallel and return a Promise if all resolve
    // Promise.all returns a new promise that resolves when all of its arguments resolve
    const getAllData = () => {
      return Promise.all([
        followupsReq(),
        mappedGirlsReq(),
        deliveriesURLReq()
      ]);
    };

    // When Promise reolves, all our data is available and we can set state appropriately
    getAllData().then(
      ([followups, mappedGirls, deliveries, healthFacilities]) => {
        setFollowups(followups);
        setMappedGirls(mappedGirls);
        setDeliveries(deliveries);
        setIsLoading(false);
      }
    );
  }, [fromFilter, toFilter]);

  return [
    {
      followups,
      mappedGirls,
      deliveries,
      isLoading
    }
  ];
}

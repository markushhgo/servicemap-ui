/* eslint-disable import/prefer-default-export */
// Functions to make requests to the API

export const fetchCGSStationsData = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobile_units?type_name=CGS&page_size=150&srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchGFSStationsData = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobile_units?type_name=GFS&page_size=10&srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchBicycleNetworkData = async (apiUrl, networkType, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/bicycle_networkparts?page_size=10000&network_name=${networkType}&latlon=true&only_coords=true`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.log(err.message);
  }
};

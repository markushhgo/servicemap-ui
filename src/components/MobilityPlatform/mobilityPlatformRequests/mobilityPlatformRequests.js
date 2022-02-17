/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
// Functions to make requests to the API

export const fetchCGSStationsData = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobile_units?type_name=CGS&page_size=150&srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchGFSStationsData = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobile_units?type_name=GFS&page_size=10&srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchBicycleStandsData = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobile_units?type_name=BIS&page_size=100&srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchBicycleRouteNames = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/bicycle_networks/`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchBicycleRoutesGeometry = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/bicycle_networkparts/?page_size=1000&latlon=true`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

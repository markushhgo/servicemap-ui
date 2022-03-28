/* eslint-disable max-len */

// Functions to make requests to the API

const fetchMobilityMapData = async (apiUrl, type, pageSize, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${pageSize}&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchCultureRouteNames = async (apiUrl, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_unit_groups/`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchCultureRoutesData = async (apiUrl, type, size, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${size}&latlon=true&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchBicycleRouteNames = async (apiUrl, setData) => {
  try {
    const response = await fetch(`${apiUrl}/bicycle_network/bicycle_networks/`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchBicycleRoutesGeometry = async (apiUrl, setData) => {
  try {
    const response = await fetch(`${apiUrl}/bicycle_network/bicycle_networkparts/?page_size=1000&latlon=true`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchIotData = async (apiUrl, sourceName, setData) => {
  try {
    const response = await fetch(`${apiUrl}/iot?source_name=${sourceName}`);
    const jsonData = await response.json();
    setData(jsonData.results[0].data);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchParkingStatistics = async (setData) => {
  try {
    const response = await fetch('https://parkkiopas.turku.fi/public/v1/parking_area_statistics/');
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export {
  fetchMobilityMapData,
  fetchCultureRouteNames,
  fetchCultureRoutesData,
  fetchBicycleRouteNames,
  fetchBicycleRoutesGeometry,
  fetchIotData,
  fetchParkingStatistics,
};

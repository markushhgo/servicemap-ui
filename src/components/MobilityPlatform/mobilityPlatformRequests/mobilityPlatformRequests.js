/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
// Functions to make requests to the API

export const fetchCGSStationsData = async (apiUrl, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=CGS&page_size=150&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchGFSStationsData = async (apiUrl, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=GFS&page_size=10&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchBicycleStandsData = async (apiUrl, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=BIS&page_size=100&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchCultureRoutesGroup = async (apiUrl, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_unit_groups/`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchCultureRoutesData = async (apiUrl, type, size, setData) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${size}&latlon=true&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchIotData = async (apiUrl, sourceName, setData) => {
  try {
    const response = await fetch(`${apiUrl}/iot?source_name=${sourceName}`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

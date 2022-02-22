/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */

// Functions to make requests to the API

export const fetchMobilityMapData = async (apiUrl, type, pageSize, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${pageSize}&srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchCultureRoutesGroup = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_unit_groups/`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchCultureRoutesData = async (apiUrl, type, size, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${size}&latlon=true&srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

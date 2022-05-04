/* eslint-disable max-len */
// Functions to make requests to the API
import config from '../../../../config';

const apiUrl = config.mobilityPlatformAPI;
const isApiUrl = !apiUrl || apiUrl === 'undefined' ? null : apiUrl;

const fetchMobilityMapData = async (type, pageSize, setData) => {
  try {
    const response = await fetch(`${isApiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${pageSize}&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchCultureRouteNames = async (setData) => {
  try {
    const response = await fetch(`${isApiUrl}/mobility_data/mobile_unit_groups/`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchCultureRoutesData = async (type, size, setData) => {
  try {
    const response = await fetch(`${isApiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${size}&srid=4326`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchBicycleRouteNames = async (setData) => {
  try {
    const response = await fetch(`${isApiUrl}/bicycle_network/bicycle_networks/`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchBicycleRoutesGeometry = async (setData) => {
  try {
    const response = await fetch(`${isApiUrl}/bicycle_network/bicycle_networkparts/?page_size=1000&latlon=true`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchIotData = async (sourceName, setData) => {
  try {
    const response = await fetch(`${isApiUrl}/iot?source_name=${sourceName}`);
    const jsonData = await response.json();
    setData(jsonData.results[0].data);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchPaymentZonesData = async (type, pageSize, setData) => {
  try {
    const response = await fetch(`${isApiUrl}/mobility_data/mobile_units?type_name=${type}&page_size=${pageSize}&srid=4326&latlon=true`);
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
  fetchPaymentZonesData,
};

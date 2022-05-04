/* eslint-disable max-len */
// Functions to make requests to ecouCounter API

import config from '../../../../config';

const apiUrl = config.mobilityPlatformAPI;
const isApiUrl = !apiUrl || apiUrl === 'undefined' ? null : apiUrl;

const fetchEcoCounterStations = async (setStations) => {
  try {
    const response = await fetch(`${isApiUrl}/eco-counter/stations/`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchInitialHourData = async (day, stationId, setHourData) => {
  try {
    const response = await fetch(`${isApiUrl}/eco-counter/hour_data/get_hour_data?date=${day}&station_id=${stationId}`);
    const jsonData = await response.json();
    setHourData(jsonData);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchInitialDayDatas = async (startDate, endDate, id, setDayData) => {
  try {
    const response = await fetch(
      `${isApiUrl}/eco-counter/day_data/get_day_datas?start_date=${startDate}&end_date=${endDate}&station_id=${id}`,
    );
    const jsonData = await response.json();
    setDayData(jsonData);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchInitialWeekDatas = async (year, startWeek, endWeek, id, setWeekData) => {
  try {
    const response = await fetch(
      `${isApiUrl}/eco-counter/week_data/get_week_datas?year_number=${year}&start_week_number=${startWeek}&end_week_number=${endWeek}&station_id=${id}`,
    );
    const jsonData = await response.json();
    setWeekData(jsonData);
  } catch (err) {
    console.warn(err.message);
  }
};

const fetchInitialMonthDatas = async (yearNumber, startMonth, endMonth, id, setMonthData) => {
  try {
    const response = await fetch(
      `${isApiUrl}/eco-counter/month_data/get_month_datas?year_number=${yearNumber}&start_month_number=${startMonth}&end_month_number=${endMonth}&station_id=${id}`,
    );
    const jsonData = await response.json();
    setMonthData(jsonData);
  } catch (err) {
    console.warn(err.message);
  }
};

export {
  fetchEcoCounterStations,
  fetchInitialHourData,
  fetchInitialDayDatas,
  fetchInitialWeekDatas,
  fetchInitialMonthDatas,
};

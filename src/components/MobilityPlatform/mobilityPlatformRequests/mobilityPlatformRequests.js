/* eslint-disable import/prefer-default-export */
// Functions to make requests to the API

export const fetchStationsData = async (apiUrl, setStations) => {
  try {
    const response = await fetch(`${apiUrl}/mobile_units?srid=4326`);
    const jsonData = await response.json();
    setStations(jsonData.results);
  } catch (err) {
    console.log(err.message);
  }
};

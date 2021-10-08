const apiUrl = 'localhost:8081/eco-counter';

// Functions to make requests to ecouCounter API

export const fetchEcoCounterStations = async (setStations, setError) => {
  fetch(`${apiUrl}/stations/`)
    .then((res) => {
      setStations(res.data.features);
      // console.log(res.data.results);
    })
    .catch((err) => {
      setError(err.message);
      // console.log(err.message);
    });
};

export const fetchEcoCounterHourData = async (setHourData, setError) => {
  fetch(`${apiUrl}/hour_data/`)
    .then((res) => {
      setHourData(res.data.features);
      // console.log(res.data.results)
    })
    .catch((err) => {
      setError(err.message);
    });
};

export const fetchEcoCounterDayData = async (setDayData, setError) => {
  fetch(`${apiUrl}/day_data/`)
    .then((res) => {
      setDayData(res.data.features);
    })
    .catch((err) => {
      setError(err.message);
    });
};

export const fetchEcoCounterWeekData = async (setWeekData, setError) => {
  fetch(`${apiUrl}/week_data/`)
    .then((res) => {
      setWeekData(res.data.features);
    })
    .catch((err) => {
      setError(err.message);
    });
};

export const fetchEcoCounterMonthData = async (setMonthData, setError) => {
  fetch(`${apiUrl}/month_data/`)
    .then((res) => {
      setMonthData(res.data.features);
    })
    .catch((err) => {
      setError(err.message);
    });
};

export const fetchEcoCounterHourByDate = async (date, id, setHourDataDate, setError) => {
  fetch(`${apiUrl}/hour_data/get_hour_data?date=${date}&station=${id}`)
    .then((res) => {
      setHourDataDate(res.data.features);
    })
    .catch((err) => {
      setError(err.message);
    });
};

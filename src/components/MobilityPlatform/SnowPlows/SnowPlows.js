import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchStreetMaintenanceData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const SnowPlows = () => {
  const [streetMaintenanceSanitation1Day, setStreetMaintenanceSanitation1Day] = useState([]);
  const [streetMaintenanceSanitation3Days, setStreetMaintenanceSanitation3Days] = useState([]);
  const [streetMaintenanceSanitation1Hour, setStreetMaintenanceSanitation1Hour] = useState([]);
  const [streetMaintenanceSanitation3Hours, setStreetMaintenanceSanitation3Hours] = useState([]);
  const [streetMaintenanceSanitation6Hours, setStreetMaintenanceSanitation6Hours] = useState([]);
  const [streetMaintenanceSanitation12Hours, setStreetMaintenanceSanitation12Hours] = useState([]);
  const [streetMaintenanceOther1Day, setStreetMaintenanceOther1Day] = useState([]);
  const [streetMaintenanceOther3Days, setStreetMaintenanceOther3Days] = useState([]);
  const [streetMaintenanceOther1Hour, setStreetMaintenanceOther1Hour] = useState([]);
  const [streetMaintenanceOther3Hours, setStreetMaintenanceOther3Hours] = useState([]);
  const [streetMaintenanceOther6Hours, setStreetMaintenanceOther6Hours] = useState([]);
  const [streetMaintenanceOther12Hours, setStreetMaintenanceOther12Hours] = useState([]);

  const { openMobilityPlatform, streetMaintenancePeriod, showStreetMaintenance } = useContext(MobilityPlatformContext);

  const { Polyline } = global.rL;

  const options = {
    black: [0, 0, 0, 255],
    blue: [7, 44, 115, 255],
    brown: [117, 44, 23, 255],
    burgundy: [128, 0, 32, 255],
    green: [15, 115, 6, 255],
    orange: [227, 97, 32, 255],
    purple: [202, 15, 212, 255],
    red: [251, 5, 21, 255],
    teal: [0, 128, 128, 255],
  };

  const getOption = (input) => {
    switch (input) {
      case 'Puhtaanapito':
        return options.green;
      case 'Muut työt':
        return options.black;
      case 'Auraus':
        return options.teal;
      case 'Suolaus':
        return options.purple;
      case 'Hiekoitus':
        return options.burgundy;
      default:
        return options.blue;
    }
  };

  const getPathOptions = (input) => {
    const option = getOption(input);
    return {
      color: `rgba(${option})`,
      fillOpacity: 0.3,
      weight: 4,
    };
  };

  const maintenanceEvents = {
    sanitation: 'Puhtaanapito',
    auraus: 'Auraus',
    suolaus: 'Suolaus',
    hiekoitus: 'Hiekoitus',
    other: 'Muut työt',
  };

  const yesterDay = moment().clone().add(-1, 'days').format('YYYY-MM-DD HH:mm');
  const threeDays = moment().clone().add(-3, 'days').format('YYYY-MM-DD HH:mm');
  const oneHour = moment().clone().add(-1, 'hours').format('YYYY-MM-DD HH:mm');
  const threeHours = moment().clone().add(-3, 'hours').format('YYYY-MM-DD HH:mm');
  const sixHours = moment().clone().add(-6, 'hours').format('YYYY-MM-DD HH:mm');
  const twelveHours = moment().clone().add(-12, 'hours').format('YYYY-MM-DD HH:mm');

  // Endpoints
  const sanitation1Day = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.sanitation}&start_date_time=${yesterDay}`;
  const sanitation3Days = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.sanitation}&start_date_time=${threeDays}`;
  const sanitation1Hour = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.sanitation}&start_date_time=${oneHour}`;
  const sanitation3Hours = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.sanitation}&start_date_time=${threeHours}`;
  const sanitation6Hours = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.sanitation}&start_date_time=${sixHours}`;
  const sanitation12Hours = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.sanitation}&start_date_time=${twelveHours}`;
  const other1Day = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.other}&start_date_time=${yesterDay}`;
  const other3Days = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.other}&start_date_time=${threeDays}`;
  const other1Hour = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.other}&start_date_time=${oneHour}`;
  const other3Hours = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.other}&start_date_time=${threeHours}`;
  const other6Hours = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.other}&start_date_time=${sixHours}`;
  const other12Hours = `maintenance_works/get_geometry_history/?event=${maintenanceEvents.other}&start_date_time=${twelveHours}`;

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchStreetMaintenanceData(sanitation1Day, setStreetMaintenanceSanitation1Day);
      fetchStreetMaintenanceData(sanitation3Days, setStreetMaintenanceSanitation3Days);
      fetchStreetMaintenanceData(sanitation1Hour, setStreetMaintenanceSanitation1Hour);
      fetchStreetMaintenanceData(sanitation3Hours, setStreetMaintenanceSanitation3Hours);
      fetchStreetMaintenanceData(sanitation6Hours, setStreetMaintenanceSanitation6Hours);
      fetchStreetMaintenanceData(sanitation12Hours, setStreetMaintenanceSanitation12Hours);
      fetchStreetMaintenanceData(other1Day, setStreetMaintenanceOther1Day);
      fetchStreetMaintenanceData(other3Days, setStreetMaintenanceOther3Days);
      fetchStreetMaintenanceData(other1Hour, setStreetMaintenanceOther1Hour);
      fetchStreetMaintenanceData(other3Hours, setStreetMaintenanceOther3Hours);
      fetchStreetMaintenanceData(other6Hours, setStreetMaintenanceOther6Hours);
      fetchStreetMaintenanceData(other12Hours, setStreetMaintenanceOther12Hours);
    }
  }, [openMobilityPlatform]);

  const swapCoords = (coordsData) => {
    if (coordsData && coordsData.length > 0) {
      const swapped = coordsData.map(item => [item[1], item[0]]);
      return swapped;
    }
    return coordsData;
  };

  const validateData = inputData => inputData && inputData.length > 0;

  const renderData = (inputData) => {
    const isValid = validateData(inputData);
    if (isValid) {
      return inputData.map(item => (
        <Polyline
          key={item}
          pathOptions={getPathOptions(item.geometry.event)}
          positions={swapCoords(item.geometry.coordinates)}
        />
      ));
    }
    return null;
  };

  const setSanitationMaintenanceWork = () => {
    switch (streetMaintenancePeriod) {
      case '1day':
        return renderData(streetMaintenanceSanitation1Day);
      case '3days':
        return renderData(streetMaintenanceSanitation3Days);
      case '1hour':
        return renderData(streetMaintenanceSanitation1Hour);
      case '3hours':
        return renderData(streetMaintenanceSanitation3Hours);
      case '6hours':
        return renderData(streetMaintenanceSanitation6Hours);
      case '12hours':
        return renderData(streetMaintenanceSanitation12Hours);
      default:
        return null;
    }
  };

  const setOtherMaintenanceWork = () => {
    switch (streetMaintenancePeriod) {
      case '1day':
        return renderData(streetMaintenanceOther1Day);
      case '3days':
        return renderData(streetMaintenanceOther3Days);
      case '1hour':
        return renderData(streetMaintenanceOther1Hour);
      case '3hours':
        return renderData(streetMaintenanceOther3Hours);
      case '6hours':
        return renderData(streetMaintenanceOther6Hours);
      case '12hours':
        return renderData(streetMaintenanceOther12Hours);
      default:
        return null;
    }
  };

  return (
    <>
      {showStreetMaintenance ? <>{setSanitationMaintenanceWork()}</> : null}
      {showStreetMaintenance ? <>{setOtherMaintenanceWork()}</> : null}
    </>
  );
};

export default SnowPlows;

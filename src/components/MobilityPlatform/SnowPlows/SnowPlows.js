import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchStreetMaintenanceData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const SnowPlows = () => {
  const [streetMaintenanceData1Day, setStreetMaintenanceData1Day] = useState([]);
  const [streetMaintenanceData3Days, setStreetMaintenanceData3Days] = useState([]);
  const [streetMaintenanceData1Hour, setStreetMaintenanceData1Hour] = useState([]);
  const [streetMaintenanceData3Hours, setStreetMaintenanceData3hours] = useState([]);
  const [streetMaintenanceData6Hours, setStreetMaintenanceData6Hours] = useState([]);
  const [streetMaintenanceData12Hours, setStreetMaintenanceData12Hours] = useState([]);

  const {
    openMobilityPlatform, streetMaintenancePeriod, showStreetMaintenance,
  } = useContext(MobilityPlatformContext);

  const { Polyline } = global.rL;

  const yesterDay = moment().clone().add(-1, 'days');
  const yesterDayFormat = yesterDay.clone().format('YYYY-MM-DD HH:mm');
  const threeDays = moment().clone().add(-3, 'days');
  const threeDaysFormat = threeDays.clone().format('YYYY-MM-DD HH:mm');
  const oneHour = moment().clone().add(-1, 'hours');
  const oneHourFormat = oneHour.clone().format('YYYY-MM-DD HH:mm');
  const threeHours = moment().clone().add(-3, 'hours');
  const threeHoursFormat = threeHours.clone().format('YYYY-MM-DD HH:mm');
  const sixHours = moment().clone().add(-6, 'hours');
  const sixHoursFormat = sixHours.clone().format('YYYY-MM-DD HH:mm');
  const twelveHours = moment().clone().add(-12, 'hours');
  const twelveHoursFormat = twelveHours.clone().format('YYYY-MM-DD HH:mm');

  const endpointYesterDay = `maintenance_works/get_geometry_history/?event=Puhtaanapito&start_date_time=${yesterDayFormat}`;
  const endpointThreeDays = `maintenance_works/get_geometry_history/?event=Puhtaanapito&start_date_time=${threeDaysFormat}`;
  const endpointOneHour = `maintenance_works/get_geometry_history/?event=Puhtaanapito&start_date_time=${oneHourFormat}`;
  const endpointThreeHours = `maintenance_works/get_geometry_history/?event=Puhtaanapito&start_date_time=${threeHoursFormat}`;
  const endpointSixHours = `maintenance_works/get_geometry_history/?event=Puhtaanapito&start_date_time=${sixHoursFormat}`;
  const endpointTwelveHours = `maintenance_works/get_geometry_history/?event=Puhtaanapito&start_date_time=${twelveHoursFormat}`;

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchStreetMaintenanceData(endpointYesterDay, setStreetMaintenanceData1Day);
      fetchStreetMaintenanceData(endpointThreeDays, setStreetMaintenanceData3Days);
      fetchStreetMaintenanceData(endpointOneHour, setStreetMaintenanceData1Hour);
      fetchStreetMaintenanceData(endpointThreeHours, setStreetMaintenanceData3hours);
      fetchStreetMaintenanceData(endpointSixHours, setStreetMaintenanceData6Hours);
      fetchStreetMaintenanceData(endpointTwelveHours, setStreetMaintenanceData12Hours);
    }
  }, [openMobilityPlatform]);

  const swapCoords = (coordsData) => {
    if (coordsData.length > 0) {
      const swapped = coordsData.map(item => [item[1], item[0]]);
      return swapped;
    }
    return coordsData;
  };

  const validateData = (inputData) => {
    let isNotEmpty = false;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item) => {
        isNotEmpty = Object.keys(item).length !== 0;
      });
    }
    return isNotEmpty;
  };

  const renderData = (inputData) => {
    const validation = validateData(inputData);
    if (validation) {
      return inputData.map(item => <Polyline key={item} weight={5} positions={swapCoords(item.linestring_0)} />);
    }
    return null;
  };

  const setSelectedMaintenanceWork = () => {
    switch (streetMaintenancePeriod) {
      case '1day':
        return renderData(streetMaintenanceData1Day);
      case '3days':
        return renderData(streetMaintenanceData3Days);
      case '1hour':
        return renderData(streetMaintenanceData1Hour);
      case '3hours':
        return renderData(streetMaintenanceData3Hours);
      case '6hours':
        return renderData(streetMaintenanceData6Hours);
      case '12hours':
        return renderData(streetMaintenanceData12Hours);
      default:
        return null;
    }
  };

  return <>{showStreetMaintenance ? <>{setSelectedMaintenanceWork()}</> : null}</>;
};

export default SnowPlows;

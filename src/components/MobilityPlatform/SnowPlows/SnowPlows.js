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
  const [streetMaintenanceSandRemoval1Day, setStreetMaintenanceSandRemoval1Day] = useState([]);
  const [streetMaintenanceSandRemoval3Days, setStreetMaintenanceSandRemoval3Days] = useState([]);
  const [streetMaintenanceSandRemoval1Hour, setStreetMaintenanceSandRemoval1Hour] = useState([]);
  const [streetMaintenanceSandRemoval3Hours, setStreetMaintenanceSandRemoval3Hours] = useState([]);
  const [streetMaintenanceSandRemoval6Hours, setStreetMaintenanceSandRemoval6Hours] = useState([]);
  const [streetMaintenanceSandRemoval12Hours, setStreetMaintenanceSandRemoval12Hours] = useState([]);
  const [streetMaintenanceSnowplow1Day, setStreetMaintenanceSnowplow1Day] = useState([]);
  const [streetMaintenanceSnowplow3Days, setStreetMaintenanceSnowplow3Days] = useState([]);
  const [streetMaintenanceSnowplow1Hour, setStreetMaintenanceSnowplow1Hour] = useState([]);
  const [streetMaintenanceSnowplow3Hours, setStreetMaintenanceSnowplow3Hours] = useState([]);
  const [streetMaintenanceSnowplow6Hours, setStreetMaintenanceSnowplow6Hours] = useState([]);
  const [streetMaintenanceSnowplow12Hours, setStreetMaintenanceSnowplow12Hours] = useState([]);

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
        return options.blue;
      case 'Suolaus':
        return options.purple;
      case 'Hiekoitus':
        return options.burgundy;
      default:
        return options.teal;
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
    snowplow: 'Auraus',
    deicing: 'Suolaus',
    sanding: 'Hiekoitus',
    sandRemoval: 'Hiekanpoisto',
    other: 'Muut työt',
  };

  const getEvent = (input) => {
    switch (input) {
      case 'sanitation':
        return maintenanceEvents.sanitation;
      case 'other':
        return maintenanceEvents.other;
      case 'snowplow':
        return maintenanceEvents.snowplow;
      case 'deicing':
        return maintenanceEvents.deicing;
      case 'sanding':
        return maintenanceEvents.sanding;
      case 'sandRemoval':
        return maintenanceEvents.sandRemoval;
      default:
        return maintenanceEvents.sanitation;
    }
  };

  const yesterDay = moment().clone().add(-1, 'days').format('YYYY-MM-DD HH:mm');
  const threeDays = moment().clone().add(-3, 'days').format('YYYY-MM-DD HH:mm');
  const oneHour = moment().clone().add(-1, 'hours').format('YYYY-MM-DD HH:mm');
  const threeHours = moment().clone().add(-3, 'hours').format('YYYY-MM-DD HH:mm');
  const sixHours = moment().clone().add(-6, 'hours').format('YYYY-MM-DD HH:mm');
  const twelveHours = moment().clone().add(-12, 'hours').format('YYYY-MM-DD HH:mm');

  const createQuery = (type, dateItem) => `get_geometry_history/?event=${getEvent(type)}&start_date_time=${dateItem}`;

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchStreetMaintenanceData(createQuery('sanitation', yesterDay), setStreetMaintenanceSanitation1Day);
      fetchStreetMaintenanceData(createQuery('sanitation', threeDays), setStreetMaintenanceSanitation3Days);
      fetchStreetMaintenanceData(createQuery('sanitation', oneHour), setStreetMaintenanceSanitation1Hour);
      fetchStreetMaintenanceData(createQuery('sanitation', threeHours), setStreetMaintenanceSanitation3Hours);
      fetchStreetMaintenanceData(createQuery('sanitation', sixHours), setStreetMaintenanceSanitation6Hours);
      fetchStreetMaintenanceData(createQuery('sanitation', twelveHours), setStreetMaintenanceSanitation12Hours);
      fetchStreetMaintenanceData(createQuery('other', yesterDay), setStreetMaintenanceOther1Day);
      fetchStreetMaintenanceData(createQuery('other', threeDays), setStreetMaintenanceOther3Days);
      fetchStreetMaintenanceData(createQuery('other', oneHour), setStreetMaintenanceOther1Hour);
      fetchStreetMaintenanceData(createQuery('other', threeHours), setStreetMaintenanceOther3Hours);
      fetchStreetMaintenanceData(createQuery('other', sixHours), setStreetMaintenanceOther6Hours);
      fetchStreetMaintenanceData(createQuery('other', twelveHours), setStreetMaintenanceOther12Hours);
    }
  }, [openMobilityPlatform]);

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchStreetMaintenanceData(createQuery('sandRemoval', yesterDay), setStreetMaintenanceSandRemoval1Day);
      fetchStreetMaintenanceData(createQuery('sandRemoval', threeDays), setStreetMaintenanceSandRemoval3Days);
      fetchStreetMaintenanceData(createQuery('sandRemoval', oneHour), setStreetMaintenanceSandRemoval1Hour);
      fetchStreetMaintenanceData(createQuery('sandRemoval', threeHours), setStreetMaintenanceSandRemoval3Hours);
      fetchStreetMaintenanceData(createQuery('sandRemoval', sixHours), setStreetMaintenanceSandRemoval6Hours);
      fetchStreetMaintenanceData(createQuery('sandRemoval', twelveHours), setStreetMaintenanceSandRemoval12Hours);
      fetchStreetMaintenanceData(createQuery('snowplow', yesterDay), setStreetMaintenanceSnowplow1Day);
      fetchStreetMaintenanceData(createQuery('snowplow', threeDays), setStreetMaintenanceSnowplow3Days);
      fetchStreetMaintenanceData(createQuery('snowplow', oneHour), setStreetMaintenanceSnowplow1Hour);
      fetchStreetMaintenanceData(createQuery('snowplow', threeHours), setStreetMaintenanceSnowplow3Hours);
      fetchStreetMaintenanceData(createQuery('snowplow', sixHours), setStreetMaintenanceSnowplow6Hours);
      fetchStreetMaintenanceData(createQuery('snowplow', twelveHours), setStreetMaintenanceSnowplow12Hours);
    }
  }, [openMobilityPlatform]);

  const streetMaintenance1Day = [
    ...streetMaintenanceSanitation1Day,
    ...streetMaintenanceOther1Day,
    ...streetMaintenanceSandRemoval1Day,
    ...streetMaintenanceSnowplow1Day,
  ];
  const streetMaintenance3Days = [
    ...streetMaintenanceSanitation3Days,
    ...streetMaintenanceOther3Days,
    ...streetMaintenanceSandRemoval3Days,
    ...streetMaintenanceSnowplow3Days,
  ];
  const streetMaintenance1Hour = [
    ...streetMaintenanceSanitation1Hour,
    ...streetMaintenanceOther1Hour,
    ...streetMaintenanceSandRemoval1Hour,
    ...streetMaintenanceSnowplow1Hour,
  ];
  const streetMaintenance3Hours = [
    ...streetMaintenanceSanitation3Hours,
    ...streetMaintenanceOther3Hours,
    ...streetMaintenanceSandRemoval3Hours,
    ...streetMaintenanceSnowplow3Hours,
  ];
  const streetMaintenance6Hours = [
    ...streetMaintenanceSanitation6Hours,
    ...streetMaintenanceOther6Hours,
    ...streetMaintenanceSandRemoval6Hours,
    ...streetMaintenanceSnowplow6Hours,
  ];
  const streetMaintenance12Hours = [
    ...streetMaintenanceSanitation12Hours,
    ...streetMaintenanceOther12Hours,
    ...streetMaintenanceSandRemoval12Hours,
    ...streetMaintenanceSnowplow12Hours,
  ];

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

  const rendernMaintenanceWorks = () => {
    switch (streetMaintenancePeriod) {
      case '1day':
        return renderData(streetMaintenance1Day);
      case '3days':
        return renderData(streetMaintenance3Days);
      case '1hour':
        return renderData(streetMaintenance1Hour);
      case '3hours':
        return renderData(streetMaintenance3Hours);
      case '6hours':
        return renderData(streetMaintenance6Hours);
      case '12hours':
        return renderData(streetMaintenance12Hours);
      default:
        return null;
    }
  };

  return <>{showStreetMaintenance ? <>{rendernMaintenanceWorks()}</> : null}</>;
};

export default SnowPlows;

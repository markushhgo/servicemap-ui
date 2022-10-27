import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchStreetMaintenanceData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const SnowPlows = () => {
  const [streetMaintenanceSanitation1Day, setStreetMaintenanceSanitation1Day] = useState([]);
  const [streetMaintenanceSanitation3Days, setStreetMaintenanceSanitation3Days] = useState([]);
  const [streetMaintenanceSanitation1Hour, setStreetMaintenanceSanitation1Hour] = useState([]);
  const [streetMaintenanceSanitation3Hours, setStreetMaintenanceSanitation3Hours] = useState([]);
  const [streetMaintenanceSanitation6Hours, setStreetMaintenanceSanitation6Hours] = useState([]);
  const [streetMaintenanceSanitation12Hours, setStreetMaintenanceSanitation12Hours] = useState([]);
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
  const [streetMaintenanceDeIcing1Day, setStreetMaintenanceDeIcing1Day] = useState([]);
  const [streetMaintenanceDeIcing3Days, setStreetMaintenanceDeIcing3Days] = useState([]);
  const [streetMaintenanceDeIcing1Hour, setStreetMaintenanceDeIcing1Hour] = useState([]);
  const [streetMaintenanceDeIcing3Hours, setStreetMaintenanceDeIcing3Hours] = useState([]);
  const [streetMaintenanceDeIcing6Hours, setStreetMaintenanceDeIcing6Hours] = useState([]);
  const [streetMaintenanceDeIcing12Hours, setStreetMaintenanceDeIcing12Hours] = useState([]);

  const {
    openMobilityPlatform, streetMaintenancePeriod, showStreetMaintenance, setIsActiveStreetMaintenance,
  } = useContext(MobilityPlatformContext);

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

  const whiteOption = { color: '#ffffff', dashArray: '1, 8', weight: 4 };

  const getOption = (input) => {
    switch (input) {
      case 'Puhtaanapito':
        return options.green;
      case 'Auraus':
        return options.blue;
      case 'Hiekanpoisto':
        return options.purple;
      case 'Liukkaudentorjunta':
        return options.burgundy;
      default:
        return options.black;
    }
  };

  const getPathOptions = (input) => {
    const option = getOption(input);
    return {
      color: `rgba(${option})`,
      fillOpacity: 0.3,
      weight: 8,
    };
  };

  const maintenanceEvents = {
    sanitation: 'Puhtaanapito',
    snowplow: 'Auraus',
    deIcing: 'Liukkaudentorjunta',
    sandRemoval: 'Hiekanpoisto',
  };

  const getEvent = (input) => {
    switch (input) {
      case 'sanitation':
        return maintenanceEvents.sanitation;
      case 'snowplow':
        return maintenanceEvents.snowplow;
      case 'deIcing':
        return maintenanceEvents.deIcing;
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
      fetchStreetMaintenanceData(createQuery('snowplow', yesterDay), setStreetMaintenanceSnowplow1Day);
      fetchStreetMaintenanceData(createQuery('snowplow', threeDays), setStreetMaintenanceSnowplow3Days);
      fetchStreetMaintenanceData(createQuery('snowplow', oneHour), setStreetMaintenanceSnowplow1Hour);
      fetchStreetMaintenanceData(createQuery('snowplow', threeHours), setStreetMaintenanceSnowplow3Hours);
      fetchStreetMaintenanceData(createQuery('snowplow', sixHours), setStreetMaintenanceSnowplow6Hours);
      fetchStreetMaintenanceData(createQuery('snowplow', twelveHours), setStreetMaintenanceSnowplow12Hours);
      fetchStreetMaintenanceData(createQuery('deIcing', yesterDay), setStreetMaintenanceDeIcing1Day);
      fetchStreetMaintenanceData(createQuery('deIcing', threeDays), setStreetMaintenanceDeIcing3Days);
      fetchStreetMaintenanceData(createQuery('deIcing', oneHour), setStreetMaintenanceDeIcing1Hour);
      fetchStreetMaintenanceData(createQuery('deIcing', threeHours), setStreetMaintenanceDeIcing3Hours);
      fetchStreetMaintenanceData(createQuery('deIcing', sixHours), setStreetMaintenanceDeIcing6Hours);
      fetchStreetMaintenanceData(createQuery('deIcing', twelveHours), setStreetMaintenanceDeIcing12Hours);
      fetchStreetMaintenanceData(createQuery('sandRemoval', yesterDay), setStreetMaintenanceSandRemoval1Day);
      fetchStreetMaintenanceData(createQuery('sandRemoval', threeDays), setStreetMaintenanceSandRemoval3Days);
      fetchStreetMaintenanceData(createQuery('sandRemoval', oneHour), setStreetMaintenanceSandRemoval1Hour);
      fetchStreetMaintenanceData(createQuery('sandRemoval', threeHours), setStreetMaintenanceSandRemoval3Hours);
      fetchStreetMaintenanceData(createQuery('sandRemoval', sixHours), setStreetMaintenanceSandRemoval6Hours);
      fetchStreetMaintenanceData(createQuery('sandRemoval', twelveHours), setStreetMaintenanceSandRemoval12Hours);
    }
  }, [openMobilityPlatform]);

  const combineData = (arr1, arr2, arr3, arr4) => [...arr1, ...arr2, ...arr3, ...arr4];

  const streetMaintenance1Day = combineData(
    streetMaintenanceSanitation1Day,
    streetMaintenanceSandRemoval1Day,
    streetMaintenanceSnowplow1Day,
    streetMaintenanceDeIcing1Day,
  );

  const streetMaintenance3Days = combineData(
    streetMaintenanceSanitation3Days,
    streetMaintenanceSandRemoval3Days,
    streetMaintenanceSnowplow3Days,
    streetMaintenanceDeIcing3Days,
  );

  const streetMaintenance1Hour = combineData(
    streetMaintenanceSanitation1Hour,
    streetMaintenanceSandRemoval1Hour,
    streetMaintenanceSnowplow1Hour,
    streetMaintenanceDeIcing1Hour,
  );

  const streetMaintenance3Hours = combineData(
    streetMaintenanceSanitation3Hours,
    streetMaintenanceSandRemoval3Hours,
    streetMaintenanceSnowplow3Hours,
    streetMaintenanceDeIcing3Hours,
  );

  const streetMaintenance6Hours = combineData(
    streetMaintenanceSanitation6Hours,
    streetMaintenanceSandRemoval6Hours,
    streetMaintenanceSnowplow6Hours,
    streetMaintenanceDeIcing6Hours,
  );

  const streetMaintenance12Hours = combineData(
    streetMaintenanceSanitation12Hours,
    streetMaintenanceSandRemoval12Hours,
    streetMaintenanceSnowplow12Hours,
    streetMaintenanceDeIcing12Hours,
  );

  const map = useMap();

  const validateData = inputData => inputData && inputData.length > 0;

  let isDataValid = false;

  const swapCoords = (coordsData) => {
    const isValid = validateData(coordsData);
    if (isValid) {
      const swapped = coordsData.map(item => [item[1], item[0]]);
      return swapped;
    }
    return coordsData;
  };

  const fitBounds = (data, isValid) => {
    if (isValid) {
      const bounds = [];
      data.forEach((item) => {
        bounds.push(swapCoords(item.geometry.coordinates));
      });
      map.fitBounds(bounds);
    }
  };

  useEffect(() => {
    if (!isDataValid) {
      setIsActiveStreetMaintenance(false);
    } else setIsActiveStreetMaintenance(true);
  }, [isDataValid, streetMaintenancePeriod, setIsActiveStreetMaintenance]);

  const renderData = (inputData) => {
    isDataValid = validateData(inputData);
    fitBounds(inputData, isDataValid);
    if (isDataValid) {
      return inputData
        .filter(item => item.geometry.name === 'LineString')
        .map(item => (
          <React.Fragment key={`${item.geometry.event}${item.geometry.coordinates[0]}`}>
            <Polyline
              pathOptions={getPathOptions(item.geometry.event)}
              positions={swapCoords(item.geometry.coordinates)}
            />
            <Polyline pathOptions={whiteOption} positions={swapCoords(item.geometry.coordinates)} />
          </React.Fragment>
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

  return <>{showStreetMaintenance ? rendernMaintenanceWorks() : null}</>;
};

export default SnowPlows;

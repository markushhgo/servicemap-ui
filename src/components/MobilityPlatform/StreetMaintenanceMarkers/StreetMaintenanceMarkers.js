import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import roadworkIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_roadwork.svg';
import snowPlowIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_snowplow.svg';
import jsonFile from '../../../../node_modules/servicemap-ui-turku/assets/files/maintenance-new.json';

const StreetMaintenanceMarkers = ({ classes }) => {
  const [maintenanceLocations, setMaintenanceLocations] = useState(null);
  const [snowplowLocations, setSnowplowLocations] = useState(null);

  const { showMaintenance } = useContext(MobilityPlatformContext);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const maintenanceIcon = icon({
    iconUrl: roadworkIcon,
    iconSize: [45, 45],
  });

  const setSnowplowIcon = icon({
    iconUrl: snowPlowIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    setMaintenanceLocations(jsonFile);
  }, [setMaintenanceLocations]);

  const formatCoords = (inputCoords) => {
    const filteredCoords = inputCoords.replace(/[{()}]/g, '');
    const coordsArray = filteredCoords.split(' ');
    return coordsArray.splice(0).reverse();
  };

  const checkEventType = () => {
    const snowPlow = [];
    if (maintenanceLocations !== null) {
      maintenanceLocations.forEach((item) => {
        if (item.last_location.events[0] === 'Lumen poisajo') {
          snowPlow.push(item);
        }
      });
    }
    setSnowplowLocations(snowPlow);
  };

  const formatTimeStamp = (inputData) => {
    const inputArr = inputData.split(' ');
    const timeStr = inputArr[1];
    return timeStr.substring(0, 5);
  };

  useEffect(() => {
    checkEventType();
  }, [maintenanceLocations]);

  return (
    <>
      {showMaintenance ? (
        <div>
          <div>
            {maintenanceLocations
            && maintenanceLocations.map(item => (
              <Marker
                key={item.id}
                icon={maintenanceIcon}
                position={formatCoords(item.last_location.coords)}
              >
                <div className={classes.popupWrapper}>
                  <Popup className="charger-stations-popup">
                    <div className={classes.popupInner}>
                      <Typography className={classes.header} variant="subtitle1">
                        Kunnossapitotyö
                      </Typography>
                      <Typography variant="body2">
                        <strong>Työ:</strong>
                        {' '}
                        {item.last_location.events[0]}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Aika:</strong>
                        {' '}
                        {formatTimeStamp(item.last_location.timestamp)}
                      </Typography>
                    </div>
                  </Popup>
                </div>
              </Marker>
            ))}
          </div>
          <div>
            {snowplowLocations
            && snowplowLocations.map(item => (
              <Marker
                key={item.id}
                icon={setSnowplowIcon}
                position={formatCoords(item.last_location.coords)}
              >
                <div className={classes.popupWrapper}>
                  <Popup className="charger-stations-popup">
                    <div className={classes.popupInner}>
                      <Typography className={classes.header} variant="subtitle1">
                        Kunnossapitotyö
                      </Typography>
                      <Typography variant="body2">
                        <strong>Työ:</strong>
                        {' '}
                        {item.last_location.events[0]}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Aika:</strong>
                        {' '}
                        {formatTimeStamp(item.last_location.timestamp)}
                      </Typography>
                    </div>
                  </Popup>
                </div>
              </Marker>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

StreetMaintenanceMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StreetMaintenanceMarkers;

import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import snowPlowIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_snowplow.svg';
import snowPlowData from '../../../../node_modules/servicemap-ui-turku/assets/files/snowplow-data-helmi.json';

const SnowPlows = ({ classes, intl }) => {
  const [snowPlows, setSnowPlows] = useState(null);

  const { showSnowPlows } = useContext(MobilityPlatformContext);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: snowPlowIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    setSnowPlows(snowPlowData.results);
  }, [setSnowPlows]);

  const formatCoords = (input) => {
    const coordsArray = [];
    const output = input.replace(/[()]/g, '');
    const initialArray = output.split(' ').splice(0);
    coordsArray.push(parseFloat(initialArray[1]));
    coordsArray.push(parseFloat(initialArray[0]));
    return coordsArray;
  };

  const formatEvent = (inputEvent) => {
    switch (inputEvent) {
      case 'au':
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.snowPlow' });
      case 'hi':
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.sandSpread' });
      case 'su':
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.deIcing' });
      default:
        return inputEvent;
    }
  };

  const formatTime = (inputTimeStamp) => {
    const outputTimeStamp = inputTimeStamp.split(' ');
    const timeArr = outputTimeStamp[1].split(':');
    return `${timeArr[0]}:${timeArr[1]}`;
  };

  return (
    <>
      {showSnowPlows ? (
        <div>
          <div>
            {snowPlows
              && snowPlows.map(item => (
                <Marker key={item.id} icon={customIcon} position={formatCoords(item.data.last_location.coords)}>
                  <div className={classes.popupWrapper}>
                    <Popup className="charger-stations-popup">
                      <div className={classes.popupInner}>
                        <div className={classes.subtitle}>
                          <Typography variant="subtitle1">
                            {intl.formatMessage({
                              id: 'mobilityPlatform.content.streetMaintenance.title',
                            })}
                          </Typography>
                        </div>
                        <Typography>
                          <strong>
                            {intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance' })}
                          </strong>
                          :
                          {' '}
                          {formatEvent(item.data.last_location.events[0])}
                        </Typography>
                        <Typography>
                          <strong>
                            {intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.time' })}
                          </strong>
                          :
                          {' '}
                          {formatTime(item.data.last_location.timestamp)}
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

SnowPlows.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SnowPlows;

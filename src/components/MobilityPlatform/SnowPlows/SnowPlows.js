import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import snowPlowIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_snowplow.svg';

const SnowPlows = ({ classes, intl }) => {
  const [iotData, setIotData] = useState(null);
  const [iotDataHistory24h, setIotDataHistory24h] = useState(null);
  const [iotDataHistory12h, setIotDataHistory12h] = useState(null);
  const [activeSnowPlows, setActiveSnowPlows] = useState(null);

  const { openMobilityPlatform, showSnowPlows, showSnowPlowsHistory } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: snowPlowIcon,
    iconSize: [45, 45],
  });

  // TODO compare data and filter possible duplicate ids.
  // TODO refactor

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'ISP', setIotData);
      fetchIotData(apiUrl, '12H', setIotDataHistory12h);
      fetchIotData(apiUrl, '24H', setIotDataHistory24h);
    }
  }, [openMobilityPlatform, setIotData, setIotDataHistory24h, setIotDataHistory12h]);


  useEffect(() => {
    if (showSnowPlows && showSnowPlowsHistory === '1hour') {
      setActiveSnowPlows(iotData);
    }
  }, [showSnowPlows, showSnowPlowsHistory]);

  useEffect(() => {
    if (showSnowPlowsHistory === '12hour') {
      setActiveSnowPlows(iotDataHistory12h);
    } else if (showSnowPlowsHistory === '24hours') {
      setActiveSnowPlows(iotDataHistory24h);
    }
  }, [showSnowPlowsHistory, iotDataHistory12h, iotDataHistory24h]);

  const formatCoords = (input) => {
    const coordsArray = [];
    const output = input.replace(/[()]/g, '');
    const initialArray = output.split(' ');
    coordsArray.push(Number(initialArray[1]));
    coordsArray.push(Number(initialArray[0]));
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
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.other' });
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
            {activeSnowPlows
              && activeSnowPlows.map(item => (
                <Marker key={item.id} icon={customIcon} position={formatCoords(item.last_location.coords)}>
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
                          {formatEvent(item.last_location.events[0])}
                        </Typography>
                        <Typography>
                          <strong>
                            {intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.time' })}
                          </strong>
                          :
                          {' '}
                          {formatTime(item.last_location.timestamp)}
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

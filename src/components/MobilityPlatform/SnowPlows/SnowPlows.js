import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import snowPlowIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_snowplow.svg';

const SnowPlows = ({ classes, intl }) => {
  const [snowPlows, setSnowPlows] = useState(null);
  const [innerData, setInnerData] = useState(null);

  const { openMobilityPlatform, showSnowPlows } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: snowPlowIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'ISP', setSnowPlows);
    }
  }, [openMobilityPlatform, setSnowPlows]);


  useEffect(() => {
    if (snowPlows) {
      snowPlows.map((item) => {
        setInnerData(item.data);
        return item.data;
      });
    }
  }, [snowPlows]);

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
            {innerData
              && innerData.map(item => (
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

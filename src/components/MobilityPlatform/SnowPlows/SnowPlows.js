import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import SnowPlowsContent from './components/SnowPlowsContent';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import snowPlowIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_snowplow.svg';

const SnowPlows = ({ classes, intl }) => {
  const [iotData, setIotData] = useState(null);
  const [iotDataHistory12h, setIotDataHistory12h] = useState(null);
  const [iotDataHistory24h, setIotDataHistory24h] = useState(null);
  const [activeSnowPlows, setActiveSnowPlows] = useState(null);

  const { openMobilityPlatform, showSnowPlows, snowPlowsType } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: snowPlowIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'ISP', setIotData);
      fetchIotData(apiUrl, '12H', setIotDataHistory12h);
      fetchIotData(apiUrl, '24H', setIotDataHistory24h);
    }
  }, [openMobilityPlatform, setIotData, setIotDataHistory12h, setIotDataHistory24h]);

  useEffect(() => {
    if (snowPlowsType === '1hour') {
      setActiveSnowPlows(iotData);
    } else if (snowPlowsType === '12hours') {
      setActiveSnowPlows(iotDataHistory12h);
    } else if (snowPlowsType === '24hours') {
      setActiveSnowPlows(iotDataHistory24h);
    }
  }, [snowPlowsType]);

  useEffect(() => {
    if (!showSnowPlows) {
      setActiveSnowPlows(null);
    }
  }, [showSnowPlows]);

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
      case 'pe':
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.streetWashing' });
      case 'hn':
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.sandRemoval' });
      case 'hj':
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.sandRemoval' });
      case 'Hiekoitushiekan poisto ja pesu':
        return intl.formatMessage({ id: 'mobilityPlatform.content.streetMaintenance.sandRemoval' });
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
        <div className={classes.container}>
          {activeSnowPlows
              && activeSnowPlows.map(item => (
                <Marker key={item.last_location.timestamp} icon={customIcon} position={formatCoords(item.last_location.coords)}>
                  <div className={classes.popupWrapper}>
                    <Popup>
                      <SnowPlowsContent
                        formatOperation={formatEvent}
                        operation={item.last_location.events[0]}
                        formatTime={formatTime}
                        timestamp={item.last_location.timestamp}
                      />
                    </Popup>
                  </div>
                </Marker>
              ))}
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

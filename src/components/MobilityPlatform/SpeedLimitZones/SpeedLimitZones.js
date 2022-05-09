import React, { useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useMap } from 'react-leaflet';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';

const SpeedLimitZones = ({ classes, intl }) => {
  const { showSpeedLimitZones, speedLimit, speedLimitZones } = useContext(MobilityPlatformContext);

  const { Polygon, Popup } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };
  const redOptions = { color: 'rgba(251, 5, 21, 255)' };
  const greenOptions = { color: 'rgba(15, 115, 6, 255)' };
  const purpleOptions = { color: 'rgba(202, 15, 212, 255)' };
  const blackOptions = { color: 'rgba(0, 0, 0, 255)' };
  const grayOptions = { color: 'rgba(94, 94, 94, 255)' };
  const tealOptions = { color: 'rgba(0, 128, 128, 255)' };
  const orangeOptions = { color: 'rgba(227, 97, 32, 255)' };

  const filteredSpeedLimitZones = speedLimitZones.filter(item => item.extra.speed_limit === speedLimit);

  const map = useMap();

  useEffect(() => {
    if (showSpeedLimitZones && filteredSpeedLimitZones && filteredSpeedLimitZones.length > 0) {
      const bounds = [];
      filteredSpeedLimitZones.forEach((item) => {
        bounds.push([item.geometry_coords]);
      });
      map.fitBounds(bounds);
    }
  }, [showSpeedLimitZones, filteredSpeedLimitZones]);

  const selectColor = (input) => {
    switch (input) {
      case 20:
        return blueOptions;
      case 30:
        return greenOptions;
      case 40:
        return purpleOptions;
      case 50:
        return blackOptions;
      case 60:
        return blueOptions;
      case 70:
        return tealOptions;
      case 80:
        return grayOptions;
      case 100:
        return orangeOptions;
      case 120:
        return redOptions;
      default:
        return blueOptions;
    }
  };

  return (
    <>
      {showSpeedLimitZones ? (
        <div>
          {filteredSpeedLimitZones && filteredSpeedLimitZones.length > 0
            && filteredSpeedLimitZones.map(item => (
              <Polygon
                key={item.id}
                pathOptions={selectColor(item.extra.speed_limit)}
                positions={item.geometry_coords}
              >
                <div className={classes.popupWrapper}>
                  <Popup>
                    <div className={classes.popupInner}>
                      <div className={classes.subtitle}>
                        <Typography variant="subtitle1">
                          {intl.formatMessage({
                            id: 'mobilityPlatform.content.speedLimitZones.area',
                          })}
                        </Typography>
                      </div>
                      <Typography>
                        {intl.formatMessage({
                          id: 'mobilityPlatform.content.speedLimitZones.limit',
                        })}
                        :
                        {' '}
                        {item.extra.speed_limit}
                        {' '}
                        km/h
                      </Typography>
                    </div>
                  </Popup>
                </div>
              </Polygon>
            ))}
        </div>
      ) : null}
    </>
  );
};

SpeedLimitZones.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SpeedLimitZones;

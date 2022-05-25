import React, { useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';

const SpeedLimitZones = ({ classes, intl }) => {
  const { showSpeedLimitZones, speedLimit, speedLimitZones } = useContext(MobilityPlatformContext);

  const locale = useSelector(state => state.user.locale);

  const { Polygon, Popup } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)', fillOpacity: 0.3, weight: 4 };

  const filteredSpeedLimitZones = speedLimitZones.filter(item => item.extra.speed_limit === speedLimit);

  const speedLimitSuffix = locale === 'fi' ? 'km/t' : 'km/h';

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

  return (
    <>
      {showSpeedLimitZones ? (
        <div>
          {filteredSpeedLimitZones && filteredSpeedLimitZones.length > 0
            && filteredSpeedLimitZones.map(item => (
              <Polygon
                key={item.id}
                pathOptions={blueOptions}
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
                        {speedLimitSuffix}
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

import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';

const SpeedLimitZones = ({ classes, intl }) => {
  const { showSpeedLimitZones, speedLimitSelections, speedLimitZones } = useContext(MobilityPlatformContext);

  const locale = useSelector(state => state.user.locale);

  const { Polygon, Popup } = global.rL;

  const filteredSpeedLimitZones = speedLimitZones.filter(item => speedLimitSelections.includes(item.extra.speed_limit));

  const speedLimitSuffix = locale === 'fi' ? 'km/t' : 'km/h';

  const blueOptions = { color: 'rgba(7, 44, 115, 255)', fillOpacity: 0.3, weight: 4 };
  const redOptions = { color: 'rgba(251, 5, 21, 255)', fillOpacity: 0.3, weight: 4 };
  const greenOptions = { color: 'rgba(15, 115, 6, 255)', fillOpacity: 0.3, weight: 4 };
  const purpleOptions = { color: 'rgba(202, 15, 212, 255)', fillOpacity: 0.3, weight: 4 };
  const blackOptions = { color: 'rgba(0, 0, 0, 255)', fillOpacity: 0.3, weight: 4 };
  const burgundyOptions = { color: 'rgba(128, 0, 32, 255)', fillOpacity: 0.3, weight: 4 };
  const tealOptions = { color: 'rgba(0, 128, 128, 255)', fillOpacity: 0.3, weight: 4 };
  const orangeOptions = { color: 'rgba(227, 97, 32, 255)', fillOpacity: 0.3, weight: 4 };
  const brownOptions = { color: 'rgba(117, 44, 23, 255)', fillOpacity: 0.3, weight: 4 };

  const selectColor = (input) => {
    switch (input) {
      case 20:
        return brownOptions;
      case 30:
        return greenOptions;
      case 40:
        return purpleOptions;
      case 50:
        return blueOptions;
      case 60:
        return redOptions;
      case 70:
        return tealOptions;
      case 80:
        return burgundyOptions;
      case 100:
        return orangeOptions;
      case 120:
        return blackOptions;
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

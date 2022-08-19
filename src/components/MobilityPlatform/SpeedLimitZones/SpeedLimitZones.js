import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@mui/material';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';

const SpeedLimitZones = ({ classes, intl }) => {
  const { showSpeedLimitZones, speedLimitSelections, speedLimitZones } = useContext(MobilityPlatformContext);

  const { Polygon, Popup } = global.rL;

  const filteredSpeedLimitZones = speedLimitZones.filter(item => speedLimitSelections.includes(item.extra.speed_limit));

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
      case 20:
        return options.brown;
      case 30:
        return options.green;
      case 40:
        return options.purple;
      case 50:
        return options.blue;
      case 60:
        return options.red;
      case 70:
        return options.teal;
      case 80:
        return options.burgundy;
      case 100:
        return options.orange;
      case 120:
        return options.black;
      default:
        return options.blue;
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

  return (
    <>
      {showSpeedLimitZones ? (
        <div>
          {filteredSpeedLimitZones && filteredSpeedLimitZones.length > 0
            && filteredSpeedLimitZones.map(item => (
              <Polygon
                key={item.id}
                pathOptions={getPathOptions(item.extra.speed_limit)}
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
                        {intl.formatMessage({
                          id: 'mobilityPlatform.content.speedLimitZones.suffix',
                        })}
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

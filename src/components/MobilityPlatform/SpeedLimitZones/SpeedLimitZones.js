import { Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import React, { useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { isDataValid } from '../utils/utils';

const SpeedLimitZones = ({ classes, intl }) => {
  const { showSpeedLimitZones, speedLimitSelections, speedLimitZones } = useContext(MobilityPlatformContext);

  const { Polygon, Popup } = global.rL;

  const mapType = useSelector(state => state.settings.mapType);
  const useContrast = mapType === 'accessible_map';

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

  const patterns = {
    pattern1: '10 2 10',
    pattern2: '8 3 8',
    pattern3: '7',
    pattern4: '2 10 10 10',
    pattern5: '10 5',
    pattern6: '14 4 14',
    pattern7: '11 3 11',
    pattern8: '12 4',
    pattern9: '2 8 8 8',
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

  const getPattern = (input) => {
    switch (input) {
      case 20:
        return patterns.pattern1;
      case 30:
        return patterns.pattern2;
      case 40:
        return patterns.pattern3;
      case 50:
        return patterns.pattern4;
      case 60:
        return patterns.pattern5;
      case 70:
        return patterns.pattern6;
      case 80:
        return patterns.pattern7;
      case 100:
        return patterns.pattern8;
      case 120:
        return patterns.pattern9;
      default:
        return patterns.pattern1;
    }
  };

  const getPathOptions = (input) => {
    const option = getOption(input);
    const dashPattern = getPattern(input);
    return {
      color: useContrast ? 'rgba(255, 255, 255, 255)' : `rgba(${option})`,
      fillOpacity: 0.3,
      weight: 5,
      dashArray: useContrast ? dashPattern : null,
    };
  };

  const renderData = isDataValid(showSpeedLimitZones, speedLimitZones);

  return (
    <>
      {renderData ? (
        filteredSpeedLimitZones.map(item => (
          <Polygon
            key={item.id}
            pathOptions={getPathOptions(item.extra.speed_limit)}
            positions={item.geometry_coords}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: useContrast ? '0.6' : '0.3' });
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: '0.3' });
              },
            }}
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
                    }, { item: item.extra.speed_limit })}
                  </Typography>
                </div>
              </Popup>
            </div>
          </Polygon>
        ))
      ) : null}
    </>
  );
};

SpeedLimitZones.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SpeedLimitZones;

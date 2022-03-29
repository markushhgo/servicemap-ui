import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ParkingSpacesContent = ({
  classes, intl, parkingSpace, parkingStatistics,
}) => {
  const renderTitleText = (messageId, props = {}) => (
    <div className={classes.title}>
      <Typography variant="subtitle1" {...props}>
        {intl.formatMessage({
          id: messageId,
        })}
      </Typography>
    </div>
  );

  const renderContentText = (messageId, text) => (
    <div className={classes.text}>
      <Typography variant="body2">
        <strong>
          {intl.formatMessage({
            id: messageId,
          })}
          :
        </strong>
        {' '}
        {text}
      </Typography>
    </div>
  );

  const renderType = (messageId1, messageId2) => (
    <div className={classes.text}>
      <Typography variant="body2">
        <strong>
          {intl.formatMessage({
            id: messageId1,
          })}
          :
        </strong>
        {' '}
        {intl.formatMessage({
          id: messageId2,
        })}
      </Typography>
    </div>
  );

  const renderParkingCount = (capacity, parkingCount) => {
    const freeParkingSpaces = capacity - parkingCount;

    return (
      <div key={capacity}>
        <Typography variant="body2">
          <strong>
            {intl.formatMessage({ id: 'mobilityPlatform.content.parkingSpaces.parkingCount' })}
          </strong>
          :
          {' '}
          {freeParkingSpaces > 0 ? freeParkingSpaces : 0}
          {''}
          /
          {''}
          {capacity}
        </Typography>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {renderTitleText('mobilityPlatform.content.parkingSpaces.title')}
      {renderType('mobilityPlatform.content.parkingSpaces.type', 'mobilityPlatform.content.parkingSpaces.paid')}
      {renderContentText('mobilityPlatform.content.parkingSpaces.capacity', parkingSpace.properties.capacity_estimate)}
      {parkingStatistics.filter(item => item.id === parkingSpace.id).map(parking => (
        renderParkingCount(parkingSpace.properties.capacity_estimate, parking.current_parking_count)
      ))}
    </div>
  );
};

ParkingSpacesContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  parkingSpace: PropTypes.objectOf(PropTypes.any),
  parkingStatistics: PropTypes.arrayOf(PropTypes.any),
};

ParkingSpacesContent.defaultProps = {
  parkingSpace: null,
  parkingStatistics: [],
};

export default ParkingSpacesContent;

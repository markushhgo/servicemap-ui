import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ParkingSpacesContent = ({
  classes, intl, parkingSpace, parkingStatistics,
}) => {
  const renderText = (textType, translationId, text) => (
    <div className={textType === 'title' ? classes.title : classes.text}>
      {textType === 'title' ? (
        <Typography variant="subtitle1">
          {intl.formatMessage({
            id: translationId,
          })}
        </Typography>
      ) : (
        <Typography variant="body2">
          <strong>
            {intl.formatMessage({
              id: translationId,
            })}
            :
          </strong>
          {' '}
          {text}
        </Typography>
      )}
    </div>
  );

  const renderPaymentType = (translationId1, translationId2) => (
    <div className={classes.text}>
      <Typography variant="body2">
        <strong>
          {intl.formatMessage({
            id: translationId1,
          })}
          :
        </strong>
        {' '}
        {intl.formatMessage({
          id: translationId2,
        })}
      </Typography>
    </div>
  );

  const renderParkingCount = (capacity, parkingCount) => {
    const freeParkingSpaces = capacity - parkingCount;

    return (
      <div key={capacity} className={classes.text}>
        {freeParkingSpaces > 0 ? (
          <Typography variant="body2">
            <strong>
              {intl.formatMessage({ id: 'mobilityPlatform.content.parkingSpaces.parkingCount' })}
            </strong>
            :
            {' '}
            {freeParkingSpaces}
            {''}
            /
            {''}
            {capacity}
          </Typography>
        ) : (
          <Typography variant="body2">
            {intl.formatMessage({ id: 'mobilityPlatform.content.parkingSpaces.empty' })}
          </Typography>
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {renderText('title', 'mobilityPlatform.content.parkingSpaces.title')}
      {renderPaymentType('mobilityPlatform.content.parkingSpaces.type', 'mobilityPlatform.content.parkingSpaces.paid')}
      {renderText('text', 'mobilityPlatform.content.parkingSpaces.capacity', parkingSpace.properties.capacity_estimate)}
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

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const RentalCarContent = ({
  classes, address, carManufacturer, carModel, availability, intl,
}) => {
  const titleTypo = (messageId, props = {}) => (
    <div className={classes.title}>
      <Typography variant="subtitle1" {...props}>
        {intl.formatMessage({
          id: messageId,
        })}
      </Typography>
    </div>
  );

  const multiValueTypo = (
    message1Id,
    value1,
    message2Id,
    value2,
    message3Id,
    value3,
    value4,
    message4Id,
    message5Id,
  ) => (
    <div className={classes.content}>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: message1Id,
          })}
          :
        </strong>
        {' '}
        {value1}
      </Typography>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: message2Id,
          })}
          :
        </strong>
        {' '}
        {value2}
      </Typography>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: message3Id,
          })}
          :
        </strong>
        {' '}
        {value3}
      </Typography>
      {value4 ? (
        <Typography>
          {intl.formatMessage({
            id: message4Id,
          })}
        </Typography>
      ) : (
        <Typography>
          {intl.formatMessage({
            id: message5Id,
          })}
        </Typography>
      )}
    </div>
  );

  return (
    <div>
      {titleTypo('mobilityPlatform.content.rentalCars.title')}
      {multiValueTypo(
        'mobilityPlatform.content.rentalCars.address',
        address,
        'mobilityPlatform.content.rentalCars.manufacturer',
        carManufacturer,
        'mobilityPlatform.content.rentalCars.carModel',
        carModel,
        availability,
        'mobilityPlatform.content.rentalCars.available',
        'mobilityPlatform.content.rentalCars.notAvailable',
      )}
    </div>
  );
};

RentalCarContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  address: PropTypes.string,
  carManufacturer: PropTypes.string,
  carModel: PropTypes.string,
  availability: PropTypes.bool,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

RentalCarContent.defaultProps = {
  address: '',
  carManufacturer: '',
  carModel: '',
  availability: false,
};

export default RentalCarContent;

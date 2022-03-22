import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { getCurrentLocale } from '../../../utils/utils';

const RentalCarsContent = ({ classes, intl, car }) => {
  const [currentLocale, setCurrentLocale] = useState('fi');

  useEffect(() => {
    getCurrentLocale(intl.locale, setCurrentLocale);
  }, [intl.locale]);

  const titleText = (messageId, props = {}) => (
    <div className={classes.title}>
      <Typography variant="subtitle1" {...props}>
        {intl.formatMessage({
          id: messageId,
        })}
      </Typography>
    </div>
  );

  const contentText = (messageId, text) => (
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

  const renderCarInfo = (messageId, manufacturer, model) => (
    <div className={classes.text}>
      <Typography variant="body2">
        <strong>
          {intl.formatMessage({
            id: messageId,
          })}
          :
        </strong>
        {' '}
        {manufacturer}
        {' '}
        {model}
      </Typography>
    </div>
  );

  const renderLocaleText = (textFi, textEn) => {
    if (currentLocale === 'fi') {
      return textFi;
    }
    if (currentLocale === 'en') {
      return textEn;
    }
    return null;
  };

  const serviceProvider = '24Rent';

  return (
    <div className={classes.container}>
      {titleText('mobilityPlatform.content.rentalCars.title')}
      {contentText('mobilityPlatform.content.rentalCars.provider', serviceProvider)}
      {contentText('mobilityPlatform.content.rentalCars.address', car.homeLocationData.fullAddress)}
      {currentLocale !== 'sv' ? (
        <>
          <div className={classes.text}>
            <Typography>
              {renderLocaleText(car.homeLocationData.descriptions.fi, car.homeLocationData.descriptions.en)}
            </Typography>
          </div>
        </>
      ) : null}
      {renderCarInfo(
        'mobilityPlatform.content.rentalCars.carInfo',
        car.vehicleModelData.manufacturer,
        car.vehicleModelData.name,
      )}
      <div className={classes.text}>
        <Typography>
          {car.availabilityData.available
            ? intl.formatMessage({ id: 'mobilityPlatform.content.rentalCars.available' })
            : intl.formatMessage({ id: 'mobilityPlatform.content.rentalCars.reserved' })}
        </Typography>
      </div>
      {currentLocale !== 'sv' ? (
        <>
          <div className={classes.text}>
            <Typography>{renderLocaleText(car.vehicleModelData.descr, car.vehicleModelData.descren)}</Typography>
          </div>
          <div className={classes.text}>
            <Typography>{renderLocaleText(car.vehicleModelData.notes, car.vehicleModelData.notesen)}</Typography>
          </div>
        </>
      ) : null}
    </div>
  );
};

RentalCarsContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  car: PropTypes.objectOf(PropTypes.any),
};

RentalCarsContent.defaultProps = {
  car: null,
};

export default RentalCarsContent;

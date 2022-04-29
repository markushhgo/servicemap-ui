import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, Typography } from '@material-ui/core';

const RentalCarsContent = ({ classes, intl, car }) => {
  const locale = useSelector(state => state.user.locale);

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
    if (locale === 'fi') {
      return textFi;
    }
    if (locale === 'en') {
      return textEn;
    }
    return null;
  };

  const serviceProvider = '24Rent';

  return (
    <div className={classes.container}>
      {titleText('mobilityPlatform.content.rentalCars.title')}
      {contentText('mobilityPlatform.content.rentalCars.provider', serviceProvider)}
      <div className={classes.text}>
        <Link target="_blank" href="https://www.24rent.fi">
          <Typography className={classes.link} variant="body2">
            {intl.formatMessage({
              id: 'mobilityPlatform.content.rentalCars.link',
            })}

          </Typography>
        </Link>
      </div>
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
      {contentText('mobilityPlatform.content.rentalCars.address', car.homeLocationData.fullAddress)}
      {locale !== 'sv' ? (
        <>
          <div className={classes.text}>
            <Typography>
              {renderLocaleText(car.homeLocationData.descriptions.fi, car.homeLocationData.descriptions.en)}
            </Typography>
          </div>
        </>
      ) : null}
      {locale !== 'sv' ? (
        <div className={classes.text}>
          <Typography>{renderLocaleText(car.vehicleModelData.notes, car.vehicleModelData.notesen)}</Typography>
        </div>
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

import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const BikeServiceStationContent = ({ classes, intl, station }) => {
  const locale = useSelector(state => state.user.locale);

  const singleValTypo = (messageId, value, props = {}) => (
    <div {...props}>
      <Typography component="p" variant="body2">
        <strong>
          {intl.formatMessage({
            id: messageId,
          })}
          :
        </strong>
        {' '}
        {value}
      </Typography>
    </div>
  );

  const renderLocaleText = (nameFi, nameEn, nameSv) => {
    switch (locale) {
      case 'en':
        return nameEn;
      case 'sv':
        return nameSv;
      default:
        return nameFi;
    }
  };

  const renderAddress = () => {
    switch (locale) {
      case 'en':
        return singleValTypo('mobilityPlatform.content.address', station.address_en, { className: classes.margin });
      case 'sv':
        return singleValTypo('mobilityPlatform.content.address', station.address_sv, { className: classes.margin });
      default:
        return singleValTypo('mobilityPlatform.content.address', station.address_fi, { className: classes.margin });
    }
  };

  const bikeServiceStationInfo = (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="subtitle1">
          {renderLocaleText(station.name, station.name_en, station.name_sv)}
        </Typography>
      </div>
      <div className={classes.textContainer}>
        {station.address ? renderAddress() : null}
        <Typography component="p" variant="body2">
          {renderLocaleText(station.description, station.description_en, station.description_sv)}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className={classes.container}>
      {bikeServiceStationInfo}
    </div>
  );
};

BikeServiceStationContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  station: PropTypes.objectOf(PropTypes.any),
};

BikeServiceStationContent.defaultProps = {
  station: {},
};

export default BikeServiceStationContent;

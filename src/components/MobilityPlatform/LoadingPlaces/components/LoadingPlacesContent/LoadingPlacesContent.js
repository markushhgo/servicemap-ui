import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import useLocaleText from '../../../../../utils/useLocaleText';

const LoadingPlacesContent = ({ classes, intl, item }) => {
  const locale = useSelector(state => state.user.locale);
  const getLocaleText = useLocaleText();

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
        return singleValTypo('mobilityPlatform.content.address', item.address_en, { className: classes.margin });
      case 'sv':
        return singleValTypo('mobilityPlatform.content.address', item.address_sv, { className: classes.margin });
      default:
        return singleValTypo('mobilityPlatform.content.address', item.address_fi, { className: classes.margin });
    }
  };

  const bikeServiceStationInfo = (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="subtitle1">
          {renderLocaleText(item.name, item.name_en, item.name_sv)}
        </Typography>
      </div>
      <div className={classes.textContainer}>
        {item.address ? renderAddress() : null}
        <div>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Lastaus)}
          </Typography>
        </div>
        <div>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Lisatieto)}
          </Typography>
        </div>
        <div>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Muutanimi)}
          </Typography>
        </div>
        <div>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Saavutetta)}
          </Typography>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.container}>
      {bikeServiceStationInfo}
    </div>
  );
};

LoadingPlacesContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.objectOf(PropTypes.any),
};

LoadingPlacesContent.defaultProps = {
  item: {},
};

export default LoadingPlacesContent;

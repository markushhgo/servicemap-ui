import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import useLocaleText from '../../../../../utils/useLocaleText';

const LoadingPlacesContent = ({ classes, intl, item }) => {
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

  const loadingPlaceName = {
    fi: item.name_fi,
    en: item.name_en,
    sv: item.name_sv,
  };

  const loadingPlaceAddress = {
    fi: item.address_fi,
    en: item.address_en,
    sv: item.address_sv,
  };

  const renderAddress = () => singleValTypo('mobilityPlatform.content.address', getLocaleText(loadingPlaceAddress), { className: classes.margin });

  const loadingPlaceInfo = (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="subtitle1">
          {getLocaleText(loadingPlaceName)}
        </Typography>
      </div>
      <div className={classes.textContainer}>
        {item.address ? renderAddress() : null}
        <div className={classes.marginTop}>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Lastaus)}
          </Typography>
        </div>
        <div className={classes.marginTop}>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Lisatieto)}
          </Typography>
        </div>
        <div className={classes.marginTop}>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Muutanimi)}
          </Typography>
        </div>
        <div className={classes.marginTop}>
          <Typography component="p" variant="body2">
            {getLocaleText(item.extra.Saavutetta)}
          </Typography>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.container}>
      {loadingPlaceInfo}
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

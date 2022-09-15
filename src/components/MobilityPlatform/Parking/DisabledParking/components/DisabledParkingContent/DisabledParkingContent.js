import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import useLocaleText from '../../../../../../utils/useLocaleText';

const DisabledParkingContent = ({ classes, intl, item }) => {
  const getLocaleText = useLocaleText();

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="subtitle1">{intl.formatMessage({ id: 'mobilityPlatform.content.disabledParking.title' })}</Typography>
      </div>
      <div className={classes.textContainer}>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'mobilityPlatform.content.disabledParking.amount' })}
          :
          {' '}
          {item.extra.invapaikkoja}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'mobilityPlatform.content.publicParking.amount' })}
          :
          {' '}
          {item.extra.paikkoja_y}
        </Typography>
        <Typography variant="body2">
          {getLocaleText(item.extra.rajoitustyyppi)}
        </Typography>
        {item.extra.saavutettavuus.fi === 'vapaa paasy' ? (
          <Typography variant="body2">
            {intl.formatMessage({ id: 'mobilityPlatform.content.publicParking.access' })}
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

DisabledParkingContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.arrayOf(PropTypes.any),
};

DisabledParkingContent.defaultProps = {
  item: [],
};

export default DisabledParkingContent;

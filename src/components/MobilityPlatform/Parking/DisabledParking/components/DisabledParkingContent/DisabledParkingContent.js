import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const DisabledParkingContent = ({ classes, intl, item }) => (
  <div className={classes.container}>
    <div className={classes.headerContainer}>
      <Typography variant="subtitle1">{intl.formatMessage({ id: 'mobilityPlatform.content.disabledParking.title' })}</Typography>
    </div>
    <Typography variant="body2">
      {intl.formatMessage({ id: 'mobilityPlatform.content.disabledParking.amount' })}
      :
      {' '}
      {item.extra.invapaikkoja}
    </Typography>
  </div>
);

DisabledParkingContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.arrayOf(PropTypes.any),
};

DisabledParkingContent.defaultProps = {
  item: [],
};

export default DisabledParkingContent;

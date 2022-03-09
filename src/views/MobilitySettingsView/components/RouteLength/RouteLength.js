import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const RouteLength = ({
  classes, intl, length, emptyList, routeList,
}) => (
  <div className={classes.border}>
    {length ? (
      <div className={classes.paragraph}>
        <Typography component="h6" variant="body1">
          {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.title' })}
        </Typography>
        <Typography component="p" variant="body2">
          {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.length' })}
          {' '}
          {length}
          {' '}
          km.
        </Typography>
      </div>
    ) : (
      <>{emptyList(routeList)}</>
    )}
  </div>
);

RouteLength.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  length: PropTypes.number,
  emptyList: PropTypes.func.isRequired,
  routeList: PropTypes.arrayOf(PropTypes.any),
};

RouteLength.defaultProps = {
  length: null,
  routeList: null,
};

export default RouteLength;

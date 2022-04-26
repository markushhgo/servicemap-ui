import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const RouteLength = ({ classes, intl, route }) => {
  const formatRoutelength = inputLength => Math.round(inputLength / 1000);

  const renderRouteText = (routeName) => {
    switch (routeName) {
      case 'EuroVelo':
        return (
          <Typography component="p" variant="body2" className={classes.margin}>
            {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.euroVelo' })}
          </Typography>
        );
      case 'Saariston rengastie':
        return (
          <Typography component="p" variant="body2" className={classes.margin}>
            {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.archipelagoTrail' })}
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.paragraph}>
        <Typography component="h6" variant="body1">
          {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.title' })}
        </Typography>
        <Typography component="p" variant="body2">
          {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.length' })}
          {' '}
          {formatRoutelength(route.length)}
          {' '}
          km.
        </Typography>
        {renderRouteText(route.name_fi)}
      </div>
    </div>
  );
};

RouteLength.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};

RouteLength.defaultProps = {
  route: null,
};

export default RouteLength;

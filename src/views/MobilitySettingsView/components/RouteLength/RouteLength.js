import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { selectRouteName } from '../../../../components/MobilityPlatform/utils/utils';

const RouteLength = ({ classes, intl, route }) => {
  const formatRoutelength = inputLength => Math.round(inputLength / 1000);
  const locale = useSelector(state => state.user.locale);

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
        <Typography component="h6" variant="body2">
          {intl.formatMessage({ id: 'mobilityPlatform.menu.routes.name' })}
          :
          {' '}
          {selectRouteName(locale, route.name_fi, route.name_en, route.name_sv)}
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

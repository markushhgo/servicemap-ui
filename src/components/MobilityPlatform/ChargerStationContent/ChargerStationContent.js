import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ChargerStationContent = ({ classes, intl, station }) => {
  const titleTypo = (messageId, props = {}) => (
    <Typography variant="subtitle2" {...props}>
      {intl.formatMessage({
        id: messageId,
      })}
    </Typography>
  );

  const singleValTypo = (messageId, value) => (
    <Typography>
      <strong>
        {intl.formatMessage({
          id: messageId,
        })}
        :
      </strong>
      {' '}
      {value}
    </Typography>
  );

  const gasFillingInfo = (
    <>
      {titleTypo('mobilityPlatform.content.gfsTitle')}
      {singleValTypo('mobilityPlatform.content.address', station.address)}
      {singleValTypo('mobilityPlatform.content.gfsType', station.extra.lng_cng)}
      {singleValTypo('mobilityPlatform.content.operator', station.extra.operator)}
    </>
  );

  const chargerStationInfo = (
    <>
      {titleTypo('mobilityPlatform.content.cgsTitle', { className: classes.margin })}
      {singleValTypo('mobilityPlatform.content.address', station.address)}
      {titleTypo('mobilityPlatform.content.chargersTitle', { className: classes.margin })}
      {station.chargers && station.chargers.length > 0 ? station.chargers.map(charger => (
        <div key={charger.type} className={classes.contentInner}>
          {singleValTypo('mobilityPlatform.content.cgsType', charger.type)}
          {singleValTypo('mobilityPlatform.content.count', charger.count)}
          <Typography>
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.power',
              })}
              :
            </strong>
            {' '}
            {charger.power}
            {' '}
            kW
          </Typography>
          {singleValTypo('mobilityPlatform.content.operator', charger.operator)}
        </div>
      )) : null}
    </>
  );

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="subtitle1">{station.name}</Typography>
      </div>
      <div className={classes.textContainer}>
        {station.content_type.type_name === 'GFS' ? gasFillingInfo : chargerStationInfo}
      </div>
    </div>
  );
};

ChargerStationContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  station: PropTypes.objectOf(PropTypes.any),
};

ChargerStationContent.defaultProps = {
  station: {},
};

export default ChargerStationContent;

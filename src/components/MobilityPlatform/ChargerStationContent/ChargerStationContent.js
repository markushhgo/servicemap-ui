import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ChargerStationContent = ({ classes, intl, station }) => {
  const titleTypo = (messageId, props = {}) => (
    <div {...props}>
      <Typography variant="subtitle2">
        {intl.formatMessage({
          id: messageId,
        })}
      </Typography>
    </div>
  );

  const singleValTypo = (messageId, value, props = {}) => (
    <div {...props}>
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
    </div>
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
      {singleValTypo('mobilityPlatform.content.address', station.address, { className: classes.margin })}
      {titleTypo('mobilityPlatform.content.chargersTitle', { className: classes.margin })}
      {station.extra.chargers && station.extra.chargers.length > 0 ? station.extra.chargers.map(charger => (
        <div key={charger.plug} className={classes.contentInner}>
          {singleValTypo('mobilityPlatform.content.cgsType', charger.plug)}
          {singleValTypo('mobilityPlatform.content.count', charger.number)}
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
          {singleValTypo('mobilityPlatform.content.payment', station.extra.payment)}
          {singleValTypo('mobilityPlatform.content.chargeTarget', station.extra.charge_target)}
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

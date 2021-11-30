import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ChargerStationContent = ({
  classes,
  stationName,
  stationAddress,
  gasType,
  operatorName,
  contentType,
  chargers,
  stationUrl,
  intl,
}) => {
  const titleTypo = (messageId, props = {}) => (
    <Typography variant="subtitle1" {...props}>
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
      {singleValTypo('mobilityPlatform.content.address', stationAddress)}
      {singleValTypo('mobilityPlatform.content.gfsType', gasType)}
      {singleValTypo('mobilityPlatform.content.operator', operatorName)}
    </>
  );

  const chargerStationInfo = (
    <>
      {titleTypo('mobilityPlatform.content.cgsTitle', { className: classes.margin })}
      {singleValTypo('mobilityPlatform.content.address', stationAddress)}
      {titleTypo('mobilityPlatform.content.chargersTitle', { className: classes.margin })}
      {chargers.map(charger => (
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
      ))}
      <a href={stationUrl} target="_blank" rel="noopener noreferrer">
        <Typography>
          {intl.formatMessage({
            id: 'mobilityPlatform.content.url',
          })}
        </Typography>
      </a>
    </>
  );

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="h6">{stationName}</Typography>
      </div>
      <div className={classes.textContainer}>
        {contentType === 'GFS' ? gasFillingInfo : chargerStationInfo}
      </div>
    </div>
  );
};

ChargerStationContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  stationName: PropTypes.string,
  stationAddress: PropTypes.string,
  gasType: PropTypes.string,
  operatorName: PropTypes.string,
  contentType: PropTypes.string,
  chargers: PropTypes.arrayOf(PropTypes.any),
  stationUrl: PropTypes.string,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

ChargerStationContent.defaultProps = {
  stationName: '',
  stationAddress: '',
  gasType: '',
  operatorName: '',
  contentType: '',
  chargers: [],
  stationUrl: '',
};

export default ChargerStationContent;

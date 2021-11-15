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
  const gasFillingInfo = (
    <>
      <Typography variant="subtitle1">
        {intl.formatMessage({
          id: 'mobilityPlatform.content.gfsTitle',
        })}
      </Typography>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: 'mobilityPlatform.content.address',
          })}
          :
        </strong>
        {' '}
        {stationAddress}
      </Typography>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: 'mobilityPlatform.content.gfsType',
          })}
          :
        </strong>
        {' '}
        {gasType}
      </Typography>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: 'mobilityPlatform.content.operator',
          })}
          :
        </strong>
        {' '}
        {operatorName}
      </Typography>
    </>
  );

  const chargerStationInfo = (
    <>
      <Typography variant="subtitle1" className={classes.margin}>
        {intl.formatMessage({
          id: 'mobilityPlatform.content.cgsTitle',
        })}
      </Typography>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: 'mobilityPlatform.content.address',
          })}
          :
        </strong>
        {' '}
        {stationAddress}
      </Typography>
      <Typography variant="subtitle1" className={classes.margin}>
        {intl.formatMessage({
          id: 'mobilityPlatform.content.chargersTitle',
        })}
        :
      </Typography>
      {chargers.map((charger, index) => (
        <div key={index} className={classes.contentInner}>
          <Typography>
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.cgsType',
              })}
              :
            </strong>
            {' '}
            {charger.type}
          </Typography>
          <Typography>
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.count',
              })}
              :
            </strong>
            {' '}
            {charger.count}
          </Typography>
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
          <Typography>
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.operator',
              })}
              :
            </strong>
            {' '}
            {charger.operator}
          </Typography>
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

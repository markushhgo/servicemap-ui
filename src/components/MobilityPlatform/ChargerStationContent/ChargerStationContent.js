import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ChargerStationContent = ({
  classes,
  stationName,
  stationAddress,
  gasType,
  operatorName,
  chargerType,
  contentType,
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
      <Typography variant="subtitle1">
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
      <Typography>
        <strong>
          {intl.formatMessage({
            id: 'mobilityPlatform.content.cgsType',
          })}
          :
        </strong>
        {' '}
        {chargerType}
      </Typography>
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
  chargerType: PropTypes.string,
  contentType: PropTypes.string,
  stationUrl: PropTypes.string,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

ChargerStationContent.defaultProps = {
  stationName: '',
  stationAddress: '',
  gasType: '',
  operatorName: '',
  chargerType: '',
  contentType: '',
  stationUrl: '',
};

export default ChargerStationContent;

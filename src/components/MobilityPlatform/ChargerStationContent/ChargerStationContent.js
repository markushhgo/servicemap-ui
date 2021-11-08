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
}) => {
  const gasFillingInfo = (
    <>
      <Typography variant="subtitle1">Kaasutankkausasema</Typography>
      <Typography>
        <strong>Osoite:</strong>
        {' '}
        {stationAddress}
      </Typography>
      <Typography>
        <strong>Kaasuaseman tyyppi:</strong>
        {' '}
        {gasType}
      </Typography>
      <Typography>
        <strong>Operaattori:</strong>
        {' '}
        {operatorName}
      </Typography>
    </>
  );

  const chargerStationInfo = (
    <>
      <Typography variant="subtitle1">Sähkölatausema</Typography>
      <Typography>
        <strong>Osoite:</strong>
        {' '}
        {stationAddress}
      </Typography>
      <Typography>
        <strong>Latausaseman tyyppi:</strong>
        {' '}
        {chargerType}
      </Typography>
      <a href={stationUrl} target="_blank" rel="noopener noreferrer">
        <Typography>Lisätietoja</Typography>
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

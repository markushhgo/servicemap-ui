import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const BicycleStandContent = ({
  classes, standName, standModel, standCover, hullLockable, numOfPlaces, numOfStands, intl,
}) => {
  const titleTypo = (props = {}) => (
    <div className={classes.title}>
      <Typography variant="subtitle1" {...props}>
        {standName}
      </Typography>
    </div>
  );

  const multiValueTypo = (
    message1Id,
    message2Id,
    message3Id,
    message4Id,
    message5Id,
    message6Id,
    message7Id,
  ) => (
    <div className={classes.content}>
      <Typography variant="body2" display="block">
        <strong>
          {intl.formatMessage({
            id: message1Id,
          })}
          :
        </strong>
        {' '}
        {standModel}
      </Typography>
      <Typography variant="body2" display="block">
        <strong>
          {intl.formatMessage({
            id: message2Id,
          })}
          :
        </strong>
        {' '}
        {numOfPlaces}
      </Typography>
      <Typography variant="body2" display="block">
        <strong>
          {intl.formatMessage({
            id: message3Id,
          })}
          :
        </strong>
        {' '}
        {numOfStands}
      </Typography>
      {standCover ? (
        <Typography variant="body2" display="block">
          {intl.formatMessage({
            id: message4Id,
          })}
        </Typography>
      ) : (
        <Typography variant="body2" display="block">
          {intl.formatMessage({
            id: message5Id,
          })}
        </Typography>
      )}
      {hullLockable ? (
        <Typography variant="body2" display="block">
          {intl.formatMessage({
            id: message6Id,
          })}
        </Typography>
      ) : (
        <Typography variant="body2" display="block">
          {intl.formatMessage({
            id: message7Id,
          })}
        </Typography>
      )}
    </div>
  );

  return (
    <div>
      {titleTypo()}
      {multiValueTypo(
        'mobilityPlatform.content.bicycleStands.model',
        'mobilityPlatform.content.bicycleStands.numOfPlaces',
        'mobilityPlatform.content.bicycleStands.numOfStands',
        'mobilityPlatform.content.bicycleStands.covered',
        'mobilityPlatform.content.bicycleStands.notCovered',
        'mobilityPlatform.content.bicycleStands.hullLockable',
        'mobilityPlatform.content.bicycleStands.hullNotLockable',
      )}
    </div>
  );
};

BicycleStandContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  standName: PropTypes.string,
  standModel: PropTypes.string,
  standCover: PropTypes.bool,
  hullLockable: PropTypes.bool,
  numOfPlaces: PropTypes.number,
  numOfStands: PropTypes.number,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

BicycleStandContent.defaultProps = {
  standName: '',
  standModel: '',
  standCover: false,
  hullLockable: false,
  numOfPlaces: 0,
  numOfStands: 0,
};

export default BicycleStandContent;

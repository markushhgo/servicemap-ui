import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const BicycleStandContent = ({
  classes, bicycleStand, intl,
}) => {
  const titleTypo = (props = {}) => (
    <div className={classes.title}>
      <Typography variant="subtitle1" {...props}>
        {bicycleStand.name}
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
        {bicycleStand.extra.model}
      </Typography>
      <Typography variant="body2" display="block">
        <strong>
          {intl.formatMessage({
            id: message2Id,
          })}
          :
        </strong>
        {' '}
        {bicycleStand.extra.number_of_places}
      </Typography>
      <Typography variant="body2" display="block">
        <strong>
          {intl.formatMessage({
            id: message3Id,
          })}
          :
        </strong>
        {' '}
        {bicycleStand.extra.number_of_stands}
      </Typography>
      {bicycleStand.extra.covered ? (
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
      {bicycleStand.extra.hull_lockable ? (
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
  bicycleStand: PropTypes.objectOf(PropTypes.any),
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

BicycleStandContent.defaultProps = {
  bicycleStand: {},
};

export default BicycleStandContent;

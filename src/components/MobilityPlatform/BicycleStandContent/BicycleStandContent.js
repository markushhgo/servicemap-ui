import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const BicycleStandContent = ({
  classes, bicycleStand, intl,
}) => {
  // Hides pyöräpysäköinti prefix
  const renderName = (name) => {
    const splitted = name.split(' ').slice(1);
    return splitted.join(' ');
  };

  const titleTypo = () => (
    <div className={classes.title}>
      <Typography variant="subtitle1" className={classes.titleText}>
        {renderName(bicycleStand.name)}
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
    message8Id,
  ) => (
    <div className={classes.content}>
      {bicycleStand.extra.model ? (
        <div className={classes.paragraph}>
          <Typography variant="body2">
            <strong>
              {intl.formatMessage({
                id: message1Id,
              })}
              :
            </strong>
            {' '}
            {bicycleStand.extra.model}
          </Typography>
        </div>
      ) : null}
      <div className={classes.paragraph}>
        <Typography variant="body2">
          <strong>
            {intl.formatMessage({
              id: message2Id,
            })}
            :
          </strong>
          {' '}
          {bicycleStand.extra.number_of_places}
        </Typography>
      </div>
      <div className={classes.paragraph}>
        <Typography variant="body2">
          <strong>
            {intl.formatMessage({
              id: message3Id,
            })}
            :
          </strong>
          {' '}
          {bicycleStand.extra.number_of_stands}
        </Typography>
      </div>
      {bicycleStand.extra.covered ? (
        <div className={classes.paragraph}>
          <Typography variant="body2" display="block">
            {intl.formatMessage({
              id: message4Id,
            })}
          </Typography>
        </div>
      ) : (
        <div className={classes.paragraph}>
          <Typography variant="body2" display="block">
            {intl.formatMessage({
              id: message5Id,
            })}
          </Typography>
        </div>
      )}
      {bicycleStand.extra.hull_lockable ? (
        <div className={classes.paragraph}>
          <Typography variant="body2" display="block">
            {intl.formatMessage({
              id: message6Id,
            })}
          </Typography>
        </div>
      ) : (
        <div className={classes.paragraph}>
          <Typography variant="body2" display="block">
            {intl.formatMessage({
              id: message7Id,
            })}
          </Typography>
        </div>
      )}
      {bicycleStand.extra.maintained_by_turku ? (
        <div className={classes.paragraph}>
          <Typography variant="body2" display="block">
            {intl.formatMessage({
              id: message8Id,
            })}
          </Typography>
        </div>
      ) : null}
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
        'mobilityPlatform.content.bicycleStands.maintainedByTku',
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

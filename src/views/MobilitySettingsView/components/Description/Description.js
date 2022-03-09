import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';

const Description = ({
  classes, intl, onClick, routeDescription, showDescriptionText,
}) => (
  <div className={classes.descriptionContainer}>
    <div className={classes.subtitle}>
      <Button className={classes.buttonWhite} onClick={onClick}>
        <Typography className={classes.toggleText} variant="body1">
          {intl.formatMessage({
            id: 'mobilityPlatform.info.description.title',
          })}
        </Typography>
        {showDescriptionText ? <ArrowDropUp /> : <ArrowDropDown />}
      </Button>
    </div>
    {showDescriptionText ? (
      <div className={classes.paragraph}>
        <Typography component="p" variant="body2">
          {routeDescription}
        </Typography>
      </div>
    ) : null}
  </div>
);

Description.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  routeDescription: PropTypes.string,
  showDescriptionText: PropTypes.bool,
};

Description.defaultProps = {
  routeDescription: '',
  showDescriptionText: false,
};

export default Description;

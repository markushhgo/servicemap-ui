import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const InfoTextBox = ({ classes, infoText, intl }) => (
  <div className={classes.container}>
    <Typography variant="body2">
      {intl.formatMessage({
        id: infoText,
      })}
    </Typography>
  </div>
);

InfoTextBox.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  infoText: PropTypes.string,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

InfoTextBox.defaultProps = {
  infoText: '',
};

export default InfoTextBox;

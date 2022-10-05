/* eslint-disable no-underscore-dangle */
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const CloseButton = ({
  classes,
  className,
  intl,
  onClick,
  textID,
  ...rest
}) => (
  <Button
    aria-label={intl.formatMessage({ id: 'general.close' })}
    className={`${classes.flexBase} ${classes.button} ${className || ''}`}
    onClick={() => {
      onClick();
    }}
    {...rest}
  >
    <Close />
    {
      textID
        ? <FormattedMessage id={textID} />
        : <FormattedMessage id="general.close" />
    }
  </Button>
);

CloseButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  className: PropTypes.string,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  textID: PropTypes.string,
};

CloseButton.defaultProps = {
  className: null,
  textID: null,
};

export default CloseButton;

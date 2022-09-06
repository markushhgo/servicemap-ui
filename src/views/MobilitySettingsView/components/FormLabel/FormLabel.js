import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Typography, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Render 1 or more switches inside form.
   * @property {any} classes
   * @property {any} intl
   * @property {string} keyVal
   * @property {string} msgId
   * @property {boolean} checkedValue
   * @property {Function} onChangeValue
   * @return {JSX Element}
   */

const FormLabel = ({
  classes, intl, msgId, checkedValue, onChangeValue,
}) => (
  <FormControlLabel
    label={(
      <Typography
        variant="body2"
        aria-label={intl.formatMessage({
          id: msgId,
        })}
      >
        {intl.formatMessage({
          id: msgId,
        })}
      </Typography>
      )}
    control={(
      <CustomSwitch
        checked={checkedValue}
        role="switch"
        inputProps={{
          'aria-label': intl.formatMessage({
            id: msgId,
          }),
        }}
        onChange={onChangeValue}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onChangeValue();
          }
        }}
      />
      )}
    className={classes.formLabel}
  />
);

const CustomSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#ecaa00',
    '&:hover': {
      backgroundColor: ('#f2f2f2'),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'rgba(245, 245, 245, 255)',
    opacity: 0.9,
  },
}));

FormLabel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  msgId: PropTypes.string,
  checkedValue: PropTypes.bool,
  onChangeValue: PropTypes.func.isRequired,
};

FormLabel.defaultProps = {
  msgId: '',
  checkedValue: false,
};

export default FormLabel;
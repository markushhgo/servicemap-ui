import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputDate = ({
  classes, value, onClick, onChange,
}, ref) => (
  <input
    className={classes.input}
    type="text"
    value={value}
    ref={ref}
    onChange={(e) => onChange(e.target.value)}
    onClick={onClick}
  />
);

InputDate.propTypes = {
  classes: PropTypes.shape({
    input: PropTypes.string,
  }).isRequired,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputDate.defaultProps = {
  value: '',
};

export default forwardRef(InputDate);

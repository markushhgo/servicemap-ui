import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const List = ({ input }) => (
  <ul>
    {input.map(item => (
      <li key={item}>
        <Typography variant="body2">{item}</Typography>
      </li>
    ))}
  </ul>
);

List.propTypes = {
  input: PropTypes.arrayOf(PropTypes.any),
};

List.defaultProps = {
  input: null,
};

export default List;

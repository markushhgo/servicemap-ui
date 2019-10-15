import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { withStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles';

const AddressMarker = ({
  Marker, Tooltip, address, classes, embeded,
}) => {
  if (!address || !address.addressCoordinates) {
    return null;
  }
  // eslint-disable-next-line global-require
  const { divIcon } = require('leaflet');
  const addressIcon = divIcon({
    html: renderToStaticMarkup(
      <span style={{ fontSize: 36 }} className="icon-icon-address" />,
    ),
    iconSize: [45, 45],
    iconAnchor: [22, 42],
  });

  return (
    <Marker
      className="addressMarker"
      position={[address.addressCoordinates[1], address.addressCoordinates[0]]}
      icon={addressIcon}
      keyboard={false}
    >
      {
        embeded
        && (
          <Tooltip
            className={classes.unitTooltip}
            direction="top"
            offset={[0, -36]}
            permanent
          >
            <Typography variant="body2">
              {address.addressTitle}
            </Typography>
          </Tooltip>
        )
      }
    </Marker>
  );
};

AddressMarker.propTypes = {
  Marker: PropTypes.objectOf(PropTypes.any).isRequired,
  Tooltip: PropTypes.objectOf(PropTypes.any).isRequired,
  address: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  embeded: PropTypes.bool,
};

AddressMarker.defaultProps = {
  embeded: false,
};


// Listen to redux state
const mapStateToProps = (state) => {
  const { address } = state;
  return {
    address,
  };
};


export default withStyles(styles)(connect(
  mapStateToProps,
  null,
)(AddressMarker));

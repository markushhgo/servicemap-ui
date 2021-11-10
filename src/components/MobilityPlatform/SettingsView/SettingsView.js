import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Menu,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

const SettingsView = ({
  intl,
  classes,
  showChargingStations,
  setShowChargingStations,
  showGasFillingStations,
  setShowGasFillingStations,
  showEcoCounter,
  setShowEcoCounter,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAllChargingStations = () => {
    if (!showChargingStations) {
      setShowChargingStations(true);
    } else {
      setShowChargingStations(false);
    }
  };

  const showAllGasFillingStations = () => {
    if (!showGasFillingStations) {
      setShowGasFillingStations(true);
    } else {
      setShowGasFillingStations(false);
    }
  };

  const showAllEcoCounterStations = () => {
    if (!showEcoCounter) {
      setShowEcoCounter(true);
    } else {
      setShowEcoCounter(false);
    }
  };

  return (
    <div className={classes.container}>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Typography component="p" variant="subtitle1" className={classes.subtitle}>
          {intl.formatMessage({
            id: 'mobilityPlatform.menu.title',
          })}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'left',
          horizontal: 'top',
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className={classes.menuPanel}>
          <FormControl variant="standard" className={classes.formControl}>
            <FormLabel component="legend">
              <Typography variant="subtitle1">
                {intl.formatMessage({
                  id: 'mobilityPlatform.menu.subtitle',
                })}
              </Typography>
            </FormLabel>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                label={(
                  <Typography variant="body2">
                    {intl.formatMessage({
                      id: 'mobilityPlatform.menu.showChargingStations',
                    })}
                  </Typography>
              )}
                control={(
                  <Switch
                    checked={showChargingStations}
                    onChange={showAllChargingStations}
                  />
              )}
              />
              <FormControlLabel
                label={(
                  <Typography variant="body2">
                    {intl.formatMessage({
                      id: 'mobilityPlatform.menu.showGasStations',
                    })}
                  </Typography>
              )}
                control={(
                  <Switch
                    checked={showGasFillingStations}
                    onChange={showAllGasFillingStations}
                  />
              )}
              />
              <FormControlLabel
                label={(
                  <Typography variant="body2">
                    {intl.formatMessage({
                      id: 'mobilityPlatform.menu.showEcoCounter',
                    })}
                  </Typography>
              )}
                control={(
                  <Switch
                    checked={showEcoCounter}
                    onChange={showAllEcoCounterStations}
                  />
              )}
              />
            </FormGroup>
          </FormControl>
        </div>
      </Menu>
    </div>
  );
};

SettingsView.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  showChargingStations: PropTypes.bool,
  setShowChargingStations: PropTypes.func.isRequired,
  showGasFillingStations: PropTypes.bool,
  setShowGasFillingStations: PropTypes.func.isRequired,
  showEcoCounter: PropTypes.bool,
  setShowEcoCounter: PropTypes.func.isRequired,
};

SettingsView.defaultProps = {
  showChargingStations: false,
  showGasFillingStations: false,
  showEcoCounter: false,
};

export default SettingsView;

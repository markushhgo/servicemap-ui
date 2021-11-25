import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
  ClickAwayListener,
} from '@material-ui/core';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';

const SettingsView = ({
  intl,
  classes,
  showChargingStations,
  setShowChargingStations,
  showGasFillingStations,
  setShowGasFillingStations,
  showEcoCounter,
  setShowEcoCounter,
  showBicycleNetwork,
  setShowBicycleNetwork,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClose = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setAnchorEl(null);
    } else {
      setIsOpen(true);
    }
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

  const showMainBicycleNetwork = () => {
    if (!showBicycleNetwork) {
      setShowBicycleNetwork(true);
    } else {
      setShowBicycleNetwork(false);
    }
  };

  const controlTypes = [
    {
      type: 'chargingStations',
      msgId: 'mobilityPlatform.menu.showChargingStations',
      checkedValue: showChargingStations,
      onChangeValue: showAllChargingStations,
    },
    {
      type: 'gasFillingStations',
      msgId: 'mobilityPlatform.menu.showGasStations',
      checkedValue: showGasFillingStations,
      onChangeValue: showAllGasFillingStations,
    },
    {
      type: 'ecoCounterStations',
      msgId: 'mobilityPlatform.menu.showEcoCounter',
      checkedValue: showEcoCounter,
      onChangeValue: showAllEcoCounterStations,
    },
    {
      type: 'bicycleMainNetwork',
      msgId: 'mobilityPlatform.menu.showBicycleMain',
      checkedValue: showBicycleNetwork,
      onChangeValue: showMainBicycleNetwork,
    },
  ];

  const arrowIcon = isOpen
    ? <ArrowDropUp className={classes.iconRight} />
    : <ArrowDropDown className={classes.iconRight} />;

  return (
    <div className={classes.container}>
      <Button
        id="basic-button"
        className={classes.button}
        ref={(node) => {
          setAnchorEl(node);
        }}
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleToggle}
      >
        <Typography component="p" variant="subtitle1" className={classes.subtitle}>
          {intl.formatMessage({
            id: 'mobilityPlatform.menu.title',
          })}
        </Typography>
        {arrowIcon}
      </Button>
      {isOpen && (
        <ClickAwayListener onClickAway={handleClose}>
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
                {controlTypes.map(item => (
                  <FormControlLabel
                    key={item.type}
                    label={(
                      <Typography variant="body2">
                        {intl.formatMessage({
                          id: item.msgId,
                        })}
                      </Typography>
              )}
                    control={(
                      <Switch
                        checked={item.checkedValue}
                        onChange={item.onChangeValue}
                      />
              )}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
        </ClickAwayListener>
      )}
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
  showBicycleNetwork: PropTypes.bool,
  setShowBicycleNetwork: PropTypes.func.isRequired,
};

SettingsView.defaultProps = {
  showChargingStations: false,
  showGasFillingStations: false,
  showEcoCounter: false,
  showBicycleNetwork: false,
};

export default SettingsView;

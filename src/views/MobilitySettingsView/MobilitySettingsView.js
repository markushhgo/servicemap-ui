import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, FormGroup, FormControl, FormControlLabel, Switch, Button,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
// eslint-disable-next-line import/no-named-as-default
import MobilityPlatformContext from '../../context/MobilityPlatformContext';
import TitleBar from '../../components/TitleBar';
import BicycleNetworkInfo from '../../components/MobilityPlatform/BicycleNetworkInfo';
import iconWalk from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_walk.svg';
import iconBicycle from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle.svg';
import iconCar from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_car.svg';

const MobilitySettingsView = ({ classes, intl }) => {
  const [openWalkSettings, setOpenWalkSettings] = useState(false);
  const [openBicycleSettings, setOpenBicycleSettings] = useState(false);
  const [openCarSettings, setOpenCarSettings] = useState(false);

  const {
    showChargingStations,
    setShowChargingStations,
    showGasFillingStations,
    setShowGasFillingStations,
    showEcoCounter,
    setShowEcoCounter,
    showBicycleNetwork,
    setShowBicycleNetwork,
    showBicycleLocal,
    setShowBicycleLocal,
    showBicycleLanes,
    setShowBicycleLanes,
  } = useContext(MobilityPlatformContext);

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

  const showLocalBicycleNetwork = () => {
    if (!showBicycleLocal) {
      setShowBicycleLocal(true);
    } else {
      setShowBicycleLocal(false);
    }
  };

  const showBicycleQualityLanes = () => {
    if (!showBicycleLanes) {
      setShowBicycleLanes(true);
    } else {
      setShowBicycleLanes(false);
    }
  };

  const walkingControlTypes = [
    {
      type: 'ecoCounterStations',
      msgId: 'mobilityPlatform.menu.showEcoCounter',
      checkedValue: showEcoCounter,
      onChangeValue: showAllEcoCounterStations,
    },
  ];

  const bicycleControlTypes = [
    {
      type: 'bicycleMainNetwork',
      msgId: 'mobilityPlatform.menu.showBicycleMain',
      checkedValue: showBicycleNetwork,
      onChangeValue: showMainBicycleNetwork,
    },
    {
      type: 'bicycleLocalNetwork',
      msgId: 'mobilityPlatform.menu.showBicycleLocal',
      checkedValue: showBicycleLocal,
      onChangeValue: showLocalBicycleNetwork,
    },
    {
      type: 'bicycleQualityLanes',
      msgId: 'mobilityPlatform.menu.showBicycleLanes',
      checkedValue: showBicycleLanes,
      onChangeValue: showBicycleQualityLanes,
    },
    {
      type: 'ecoCounterStations',
      msgId: 'mobilityPlatform.menu.showEcoCounter',
      checkedValue: showEcoCounter,
      onChangeValue: showAllEcoCounterStations,
    },
  ];

  const carControlTypes = [
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
  ];

  const walkSettingsToggle = () => {
    if (!openWalkSettings) {
      setOpenWalkSettings(true);
    } else {
      setOpenWalkSettings(false);
    }
  };

  const bicycleSettingsToggle = () => {
    if (!openBicycleSettings) {
      setOpenBicycleSettings(true);
    } else {
      setOpenBicycleSettings(false);
    }
  };

  const carSettingsToggle = () => {
    if (!openCarSettings) {
      setOpenCarSettings(true);
    } else {
      setOpenCarSettings(false);
    }
  };

  return (
    <div>
      <TitleBar
        title={intl.formatMessage({ id: 'general.pageTitles.mobilityPlatform.title' })}
        titleComponent="h3"
        backButton
        className={classes.topBarColor}
      />
      <div className={classes.container}>
        <FormControl variant="standard" className={classes.formControl}>
          <FormGroup className={classes.formGroup}>
            <>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => walkSettingsToggle()}
                  variant="outlined"
                  className={openWalkSettings ? classes.buttonActive : classes.button}
                >
                  <ReactSVG
                    className={openWalkSettings
                      ? `${classes.iconActive}`
                      : `${classes.icon}`
                        }
                    src={iconWalk}
                  />
                  <Typography variant="body2">
                    {intl.formatMessage({
                      id: 'mobilityPlatform.menu.title.walk',
                    })}
                  </Typography>
                </Button>
              </div>
              {openWalkSettings
                && walkingControlTypes.map(item => (
                  <FormControlLabel
                    key={item.type}
                    label={(
                      <Typography variant="body2">
                        {intl.formatMessage({
                          id: item.msgId,
                        })}
                      </Typography>
                    )}
                    control={<Switch checked={item.checkedValue} onChange={item.onChangeValue} />}
                    color="warning"
                    className={classes.formLabel}
                  />
                ))}
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => bicycleSettingsToggle()}
                  variant="outlined"
                  className={openBicycleSettings ? classes.buttonActive : classes.button}
                >
                  <ReactSVG
                    className={openBicycleSettings
                      ? `${classes.iconActive}`
                      : `${classes.icon}`
                        }
                    src={iconBicycle}
                  />
                  <Typography variant="body2">
                    {intl.formatMessage({
                      id: 'mobilityPlatform.menu.title.bicycle',
                    })}
                  </Typography>
                </Button>
              </div>
              {openBicycleSettings
                && bicycleControlTypes.map(item => (
                  <FormControlLabel
                    key={item.type}
                    label={(
                      <Typography variant="body2">
                        {intl.formatMessage({
                          id: item.msgId,
                        })}
                      </Typography>
                    )}
                    control={<Switch checked={item.checkedValue} onChange={item.onChangeValue} />}
                    color="warning"
                    className={classes.formLabel}
                  />
                ))}
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => carSettingsToggle()}
                  variant="outlined"
                  className={openCarSettings ? classes.buttonActive : classes.button}
                >
                  <ReactSVG
                    className={openCarSettings
                      ? `${classes.iconActive}`
                      : `${classes.icon}`
                        }
                    src={iconCar}
                  />
                  <Typography variant="body2">
                    {intl.formatMessage({
                      id: 'mobilityPlatform.menu.title.car',
                    })}
                  </Typography>
                </Button>
              </div>
              {openCarSettings
                && carControlTypes.map(item => (
                  <FormControlLabel
                    key={item.type}
                    label={(
                      <Typography variant="body2">
                        {intl.formatMessage({
                          id: item.msgId,
                        })}
                      </Typography>
                    )}
                    control={<Switch checked={item.checkedValue} onChange={item.onChangeValue} />}
                    color="warning"
                    className={classes.formLabel}
                  />
                ))}
            </>
          </FormGroup>
        </FormControl>
      </div>
      <BicycleNetworkInfo />
    </div>
  );
};

MobilitySettingsView.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MobilitySettingsView;

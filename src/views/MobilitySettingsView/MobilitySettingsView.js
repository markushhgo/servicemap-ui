import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, FormGroup, FormControl, FormControlLabel, Switch, Button,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
// eslint-disable-next-line import/no-named-as-default
import MobilityPlatformContext from '../../context/MobilityPlatformContext';
import TitleBar from '../../components/TitleBar';
import InfoTextBox from '../../components/MobilityPlatform/InfoTextBox';
import iconWalk from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_walk.svg';
import iconBicycle from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle.svg';
import iconCar from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_car.svg';
import jsonFile from '../../../node_modules/servicemap-ui-turku/assets/files/bicycle-travel-routes.json';

const MobilitySettingsView = ({ classes, intl }) => {
  const [openWalkSettings, setOpenWalkSettings] = useState(false);
  const [openBicycleSettings, setOpenBicycleSettings] = useState(false);
  const [openCarSettings, setOpenCarSettings] = useState(false);
  const [openRouteList, setOpenRouteList] = useState(false);
  const [travelRouteList, setTravelRouteList] = useState(null);

  const {
    showChargingStations,
    setShowChargingStations,
    showGasFillingStations,
    setShowGasFillingStations,
    showEcoCounter,
    setShowEcoCounter,
    showBicycleStands,
    setShowBicycleStands,
    showMainBicycleRoutes,
    setShowMainBicycleRoutes,
    showQualityBicycleRoutes,
    setShowQualityBicycleRoutes,
    activeRoute,
    setActiveRoute,
  } = useContext(MobilityPlatformContext);

  useEffect(() => {
    setTravelRouteList(jsonFile.features);
  }, [setTravelRouteList]);

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

  const BicycleStandsToggle = () => {
    if (!showBicycleStands) {
      setShowBicycleStands(true);
    } else {
      setShowBicycleStands(false);
    }
  };

  const MainBicycleRoutesToggle = () => {
    if (!showMainBicycleRoutes) {
      setShowMainBicycleRoutes(true);
    } else {
      setShowMainBicycleRoutes(false);
    }
  };

  const QualityBicycleRoutesToggle = () => {
    if (!showQualityBicycleRoutes) {
      setShowQualityBicycleRoutes(true);
    } else {
      setShowQualityBicycleRoutes(false);
    }
  };

  const BicycleRouteListToggle = () => {
    if (!openRouteList) {
      setOpenRouteList(true);
    } else {
      setOpenRouteList(false);
      setActiveRoute(null);
    }
  };

  const ActiveBicycleRouteToggle = (index) => {
    setActiveRoute(index);
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
      type: 'ecoCounterStations',
      msgId: 'mobilityPlatform.menu.showEcoCounter',
      checkedValue: showEcoCounter,
      onChangeValue: showAllEcoCounterStations,
    },
    {
      type: 'bicycleStands',
      msgId: 'mobilityPlatform.menu.showBicycleStands',
      checkedValue: showBicycleStands,
      onChangeValue: BicycleStandsToggle,
    },
    {
      type: 'mainBicycleRoutes',
      msgId: 'mobilityPlatform.menu.showMainBicycleRoutes',
      checkedValue: showMainBicycleRoutes,
      onChangeValue: MainBicycleRoutesToggle,
    },
    {
      type: 'qualityBicycleRoutes',
      msgId: 'mobilityPlatform.menu.showQualityBicycleRoutes',
      checkedValue: showQualityBicycleRoutes,
      onChangeValue: QualityBicycleRoutesToggle,
    },
    {
      type: 'travelBicycleRoutes',
      msgId: 'mobilityPlatform.menu.showTravelBicycleRoutes',
      checkedValue: openRouteList,
      onChangeValue: BicycleRouteListToggle,
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

  const formLabel = (keyVal, msgId, checkedValue, onChangeValue) => (
    <FormControlLabel
      key={keyVal}
      label={(
        <Typography variant="body2">
          {intl.formatMessage({
            id: msgId,
          })}
        </Typography>
                    )}
      control={<Switch checked={checkedValue} onChange={onChangeValue} />}
      className={classes.formLabel}
    />
  );

  const buttonComponent = (onClickFunc, settingState, iconName, translationId) => (
    <Button
      onClick={() => onClickFunc()}
      variant="outlined"
      className={settingState ? classes.buttonActive : classes.button}
    >
      <ReactSVG className={settingState ? `${classes.iconActive}` : `${classes.icon}`} src={iconName} />
      <Typography variant="body2">
        {intl.formatMessage({
          id: translationId,
        })}
      </Typography>
    </Button>
  );

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
                {buttonComponent(walkSettingsToggle, openWalkSettings, iconWalk, 'mobilityPlatform.menu.title.walk')}
              </div>
              {openWalkSettings
                && walkingControlTypes.map(item => (
                  formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue)
                ))}
              <div className={classes.buttonContainer}>
                {buttonComponent(bicycleSettingsToggle, openBicycleSettings, iconBicycle, 'mobilityPlatform.menu.title.bicycle')}
              </div>
              {openBicycleSettings
                && bicycleControlTypes.map(item => (
                  formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue)
                ))}
              {openRouteList
                && travelRouteList.map((item, index) => (
                  <Button
                    key={item.properties.id}
                    variant="outlined"
                    className={index === activeRoute ? classes.buttonSmallActive : classes.buttonSmall}
                    onClick={() => ActiveBicycleRouteToggle(index)}
                  >
                    <Typography variant="body2">
                      {item.properties.name}
                    </Typography>
                  </Button>
                ))}
              <div className={classes.buttonContainer}>
                {buttonComponent(carSettingsToggle, openCarSettings, iconCar, 'mobilityPlatform.menu.title.car')}
              </div>
              {openCarSettings
                && carControlTypes.map(item => (
                  formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue)
                ))}
            </>
          </FormGroup>
        </FormControl>
      </div>
      {showEcoCounter ? <InfoTextBox infoText="mobilityPlatform.info.ecoCounter" /> : null}
      {showBicycleStands ? <InfoTextBox infoText="mobilityPlatform.info.bicycleStands" /> : null}
      {showChargingStations ? <InfoTextBox infoText="mobilityPlatform.info.chargingStations" /> : null}
      {showGasFillingStations ? <InfoTextBox infoText="mobilityPlatform.info.gasFillingStations" /> : null}
    </div>
  );
};

MobilitySettingsView.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MobilitySettingsView;

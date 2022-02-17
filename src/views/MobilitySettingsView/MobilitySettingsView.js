import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, FormGroup, FormControl, FormControlLabel, Switch, Button,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
// eslint-disable-next-line import/no-named-as-default
import MobilityPlatformContext from '../../context/MobilityPlatformContext';
import { fetchBicycleRouteNames } from '../../components/MobilityPlatform/mobilityPlatformRequests/mobilityPlatformRequests';
import { getCurrentLocale, selectRouteName } from '../../components/MobilityPlatform/utils/utils';
import TitleBar from '../../components/TitleBar';
import InfoTextBox from '../../components/MobilityPlatform/InfoTextBox';
import iconWalk from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_walk.svg';
import iconBicycle from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle.svg';
import iconCar from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_car.svg';

const MobilitySettingsView = ({ classes, intl }) => {
  const [openWalkSettings, setOpenWalkSettings] = useState(false);
  const [openBicycleSettings, setOpenBicycleSettings] = useState(false);
  const [openCarSettings, setOpenCarSettings] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('fi');
  const [bicycleRouteList, setBicycleRouteList] = useState(null);
  const [showBicycleRouteList, setShowBicycleRouteList] = useState(false);
  const [bicycleRouteLength, setBicycleRouteLength] = useState(null);
  const [showBicycleRouteLength, setShowBicycleRouteLength] = useState(false);
  const [activeBicycleRouteIndex, setActiveBicycleRouteIndex] = useState(null);
  const [apiUrlBicycle, setApiUrlBicycle] = useState(null);

  const {
    setOpenMobilityPlatform,
    showChargingStations,
    setShowChargingStations,
    showGasFillingStations,
    setShowGasFillingStations,
    showEcoCounter,
    setShowEcoCounter,
    showBicycleStands,
    setShowBicycleStands,
    setShowBicycleRoutes,
    setBicycleRouteName,
  } = useContext(MobilityPlatformContext);

  useEffect(() => {
    setOpenMobilityPlatform(true);
  }, [setOpenMobilityPlatform]);

  // Avoids pre-render causing window is not defined- error.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApiUrlBicycle(window.nodeEnvSettings.BICYCLE_NETWORK_API);
    }
  }, [setApiUrlBicycle]);

  useEffect(() => {
    if (apiUrlBicycle) {
      fetchBicycleRouteNames(apiUrlBicycle, setBicycleRouteList);
    }
  }, [apiUrlBicycle, setBicycleRouteList]);

  // Set current language based on user selection
  useEffect(() => {
    getCurrentLocale(intl.locale, setCurrentLocale);
  }, [intl.locale]);

  const walkSettingsToggle = () => {
    setOpenWalkSettings(current => !current);
  };

  const bicycleSettingsToggle = () => {
    setOpenBicycleSettings(current => !current);
  };

  const carSettingsToggle = () => {
    setOpenCarSettings(current => !current);
  };

  const chargingStationsToggle = () => {
    setShowChargingStations(current => !current);
  };

  const gasFillingStationsToggle = () => {
    setShowGasFillingStations(current => !current);
  };

  const ecoCounterStationsToggle = () => {
    setShowEcoCounter(current => !current);
  };

  const bicycleStandsToggle = () => {
    setShowBicycleStands(current => !current);
  };

  const bicycleRouteListToggle = () => {
    setShowBicycleRouteList(current => !current);
    setShowBicycleRoutes(current => !current);
    setShowBicycleRouteLength(current => !current);
    setBicycleRouteLength(null);
  };

  const formatBicycleRoutelength = (inputLength) => {
    setBicycleRouteLength(Math.round(inputLength / 1000));
  };

  const setBicycleRouteState = (index, inputLength, routeName) => {
    setShowBicycleRouteLength(true);
    setActiveBicycleRouteIndex(index);
    formatBicycleRoutelength(inputLength);
    setBicycleRouteName(routeName);
    setShowBicycleRoutes(true);
  };

  useEffect(() => {
    const objKeys = {
      fi: 'name_fi',
      en: 'name_en',
      sv: 'name_sv',
    };
    if (bicycleRouteList) {
      bicycleRouteList.sort((a, b) => a[objKeys[currentLocale]].localeCompare(b[objKeys[currentLocale]]));
    }
  }, [bicycleRouteList, currentLocale]);

  const walkingControlTypes = [
    {
      type: 'ecoCounterStations',
      msgId: 'mobilityPlatform.menu.showEcoCounter',
      checkedValue: showEcoCounter,
      onChangeValue: ecoCounterStationsToggle,
    },
  ];

  const bicycleControlTypes = [
    {
      type: 'bicycleSRoutes',
      msgId: 'mobilityPlatform.menu.showBicycleRoutes',
      checkedValue: showBicycleRouteList,
      onChangeValue: bicycleRouteListToggle,
    },
    {
      type: 'bicycleStands',
      msgId: 'mobilityPlatform.menu.showBicycleStands',
      checkedValue: showBicycleStands,
      onChangeValue: bicycleStandsToggle,
    },
    {
      type: 'ecoCounterStations',
      msgId: 'mobilityPlatform.menu.showEcoCounter',
      checkedValue: showEcoCounter,
      onChangeValue: ecoCounterStationsToggle,
    },
  ];

  const carControlTypes = [
    {
      type: 'chargingStations',
      msgId: 'mobilityPlatform.menu.showChargingStations',
      checkedValue: showChargingStations,
      onChangeValue: chargingStationsToggle,
    },
    {
      type: 'gasFillingStations',
      msgId: 'mobilityPlatform.menu.showGasStations',
      checkedValue: showGasFillingStations,
      onChangeValue: gasFillingStationsToggle,
    },
  ];

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

  const routeLengthComponent = (
    <div className={classes.description}>
      <div className={classes.paragraph}>
        <Typography variant="subtitle1">
          {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.info' })}
        </Typography>
        <Typography variant="body2">
          {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.length' })}
          {' '}
          {bicycleRouteLength}
          {' '}
          km.
        </Typography>
      </div>
    </div>
  );

  const routeListComponent = (inputData, activeIndex, setRouteState) => inputData.map((item, i) => (
    <Button
      key={item.id}
      variant="outlined"
      className={i === activeIndex ? classes.buttonSmallActive : classes.buttonSmall}
      onClick={() => setRouteState(i, item.length, item.name_fi)}
    >
      <Typography variant="body2">{selectRouteName(currentLocale, item.name_fi, item.name_en, item.name_sv)}</Typography>
    </Button>
  ));

  return (
    <div>
      <TitleBar
        title={intl.formatMessage({ id: 'general.pageTitles.mobilityPlatform.title' })}
        titleComponent="h3"
        backButton
        className={classes.topBarColor}
      />
      <div className={classes.container}>
        <>{showBicycleRouteLength ? routeLengthComponent : null}</>
        <FormControl variant="standard" className={classes.formControl}>
          <FormGroup className={classes.formGroup}>
            <>
              <div className={classes.buttonContainer}>
                {buttonComponent(walkSettingsToggle, openWalkSettings, iconWalk, 'mobilityPlatform.menu.title.walk')}
              </div>
              {openWalkSettings
                && walkingControlTypes.map(item => formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue))}
              <div className={classes.buttonContainer}>
                {buttonComponent(
                  bicycleSettingsToggle,
                  openBicycleSettings,
                  iconBicycle,
                  'mobilityPlatform.menu.title.bicycle',
                )}
              </div>
              {openBicycleSettings
                && bicycleControlTypes.map(item => formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue))}
              {showBicycleRouteList
                ? routeListComponent(bicycleRouteList, activeBicycleRouteIndex, setBicycleRouteState)
                : null}
              <div className={classes.buttonContainer}>
                {buttonComponent(carSettingsToggle, openCarSettings, iconCar, 'mobilityPlatform.menu.title.car')}
              </div>
              {openCarSettings
                && carControlTypes.map(item => formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue))}
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

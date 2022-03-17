import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, FormGroup, FormControl, FormControlLabel, Switch, Button,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
import MobilityPlatformContext from '../../context/MobilityPlatformContext';
import {
  fetchCultureRouteNames,
  fetchBicycleRouteNames,
} from '../../components/MobilityPlatform/mobilityPlatformRequests/mobilityPlatformRequests';
import { getCurrentLocale, selectRouteName } from '../../components/MobilityPlatform/utils/utils';
import TitleBar from '../../components/TitleBar';
import InfoTextBox from '../../components/MobilityPlatform/InfoTextBox';
import Description from './components/Description';
import RouteLength from './components/RouteLength';
import iconWalk from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_walk.svg';
import iconBicycle from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle.svg';

const MobilitySettingsView = ({ classes, intl }) => {
  const [openWalkSettings, setOpenWalkSettings] = useState(false);
  const [openBicycleSettings, setOpenBicycleSettings] = useState(false);
  const [openCultureRouteList, setOpenCultureRouteList] = useState(false);
  const [cultureRouteList, setCultureRouteList] = useState(null);
  const [filteredCultureRouteList, setFilteredCultureRouteList] = useState(null);
  const [showDescriptionText, setShowDescriptionText] = useState(false);
  const [stepButtonIndex, setStepButtonIndex] = useState(null);
  const [cultureRouteIndex, setCultureRouteIndex] = useState(null);
  const [currentLocale, setCurrentLocale] = useState('fi');
  const [bicycleRouteList, setBicycleRouteList] = useState(null);
  const [openBicycleRouteList, setOpenBicycleRouteList] = useState(false);
  const [bicycleRouteIndex, setBicycleRouteIndex] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);

  const {
    setOpenMobilityPlatform,
    showEcoCounter,
    setShowEcoCounter,
    showBicycleStands,
    setShowBicycleStands,
    setShowCultureRoutes,
    cultureRouteId,
    setCultureRouteId,
    showSnowPlows,
    setShowSnowPlows,
    setSnowPlowsType,
    setShowBicycleRoutes,
    bicycleRouteName,
    setBicycleRouteName,
  } = useContext(MobilityPlatformContext);

  /**
   * Avoids pre-render causing window is not defined- error.
   * @param {window}
   * @returns {env var || MOBILITY_PLATFORM_API} and sets it into state
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApiUrl(window.nodeEnvSettings.MOBILITY_PLATFORM_API);
    }
  }, [setApiUrl]);

  useEffect(() => {
    setOpenMobilityPlatform(true);
  }, [setOpenMobilityPlatform]);

  /**
   * Fetch list of routes
   * @param {apiUrl}
   * @returns {Array} and sets it into state
   */
  useEffect(() => {
    if (apiUrl) {
      fetchCultureRouteNames(apiUrl, setCultureRouteList);
    }
  }, [apiUrl, setCultureRouteList]);

  useEffect(() => {
    if (apiUrl) {
      fetchBicycleRouteNames(apiUrl, setBicycleRouteList);
    }
  }, [apiUrl, setBicycleRouteList]);

  /**
   * Set current language based on user selection
   */
  useEffect(() => {
    getCurrentLocale(intl.locale, setCurrentLocale);
  }, [intl.locale]);

  const nameKeys = {
    fi: 'name',
    en: 'name_en',
    sv: 'name_sv',
  };

  /**
   * @param {Array}
   * @function filter array
   * @returns {Array} and sets it into state
   */
  useEffect(() => {
    if (cultureRouteList) {
      setFilteredCultureRouteList(cultureRouteList.filter(item => item[nameKeys[currentLocale]]));
    }
  }, [cultureRouteList, currentLocale]);

  /**
   * Sort routes in alphapethical order based on current locale.
   * If locale is not finnish the filtered list is used.
   * @param {Array && locale}
   * @function sort
   * @returns {Array}
   */
  useEffect(() => {
    if (cultureRouteList && currentLocale === 'fi') {
      cultureRouteList.sort((a, b) => a[nameKeys[currentLocale]].localeCompare(b[nameKeys[currentLocale]]));
    } else if (filteredCultureRouteList && currentLocale !== 'fi') {
      filteredCultureRouteList.sort((a, b) => a[nameKeys[currentLocale]].localeCompare(b[nameKeys[currentLocale]]));
    }
  }, [cultureRouteList, filteredCultureRouteList, currentLocale]);

  /**
   * Sort routes in alphapethical order.
   * @param {Array && locale}
   * @function sort
   * @returns {Array}
   */
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

  /**
   * Toggle functions for main user types
   * @var {Boolean}
   * @returns {Boolean}
   */
  const walkSettingsToggle = () => {
    setOpenWalkSettings(current => !current);
  };

  const bicycleSettingsToggle = () => {
    setOpenBicycleSettings(current => !current);
  };

  /**
   * Toggle functions for content types
   * @var {Boolean}
   * @returns {Boolean}
   */
  const ecoCounterStationsToggle = () => {
    setShowEcoCounter(current => !current);
  };

  const bicycleStandsToggle = () => {
    setShowBicycleStands(current => !current);
  };

  const snowPlowsToggle = () => {
    setShowSnowPlows(current => !current);
    if (stepButtonIndex) {
      setStepButtonIndex(null);
    }
    setSnowPlowsType(null);
  };

  const cultureRouteListToggle = () => {
    setOpenCultureRouteList(current => !current);
    setShowCultureRoutes(current => !current);
    if (cultureRouteIndex) {
      setCultureRouteIndex(null);
    }
    if (cultureRouteId) {
      setCultureRouteId(null);
    }
  };

  const bicycleRouteListToggle = () => {
    setOpenBicycleRouteList(current => !current);
    setShowBicycleRoutes(current => !current);
    if (bicycleRouteIndex) {
      setBicycleRouteIndex(null);
    }
    if (bicycleRouteName) {
      setBicycleRouteName(null);
    }
  };

  const setCultureRouteState = (itemId, index) => {
    setCultureRouteId(itemId);
    setCultureRouteIndex(index);
    setShowCultureRoutes(true);
  };

  const setSnowplowState = (type, index) => {
    setSnowPlowsType(type);
    setStepButtonIndex(index);
  };

  const setBicycleRouteState = (index, routeName) => {
    setBicycleRouteIndex(index);
    setBicycleRouteName(routeName);
    setShowBicycleRoutes(true);
  };

  /**
   * Control types for different user types
   */
  const walkingControlTypes = [
    {
      type: 'ecoCounterStations',
      msgId: 'mobilityPlatform.menu.showEcoCounter',
      checkedValue: showEcoCounter,
      onChangeValue: ecoCounterStationsToggle,
    },
    {
      type: 'cultureRoutes',
      msgId: 'mobilityPlatform.menu.showCultureRoutes',
      checkedValue: openCultureRouteList,
      onChangeValue: cultureRouteListToggle,
    },
    {
      type: 'snowPlows',
      msgId: 'mobilityPlatform.menu.showSnowPlows',
      checkedValue: showSnowPlows,
      onChangeValue: snowPlowsToggle,
    },
  ];

  const bicycleControlTypes = [
    {
      type: 'bicycleRoutes',
      msgId: 'mobilityPlatform.menu.showBicycleRoutes',
      checkedValue: openBicycleRouteList,
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
    {
      type: 'snowPlows',
      msgId: 'mobilityPlatform.menu.showSnowPlows',
      checkedValue: showSnowPlows,
      onChangeValue: snowPlowsToggle,
    },
  ];

  const timeStepTypes = [
    {
      type: '1hour',
      title: intl.formatMessage({ id: 'mobilityPlatform.settings.buttons.1hour' }),
    },
    {
      type: '12hours',
      title: intl.formatMessage({ id: 'mobilityPlatform.settings.buttons.12hours' }),
    },
    {
      type: '24hours',
      title: intl.formatMessage({ id: 'mobilityPlatform.settings.buttons.24hours' }),
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

  /**
   * Check if route list is empty and render correct text
   * @param {Array} input
   * @param {Boolean} input
   * @param {Boolean} length
   * @returns {JSX Element || Typography} with correct id
   */
  const emptyRouteList = (input) => {
    if (input) {
      return (
        <div className={classes.paragraph}>
          <Typography component="p" variant="subtitle2">
            {input.length > 0
              ? intl.formatMessage({ id: 'mobilityPlatform.menu.routes.info' })
              : intl.formatMessage({ id: 'mobilityPlatform.menu.routes.emptyList' })}
          </Typography>
        </div>
      );
    }
    return null;
  };

  const renderBicycleRoutes = (inputData, activeIdx) => inputData.map((item, i) => (
    <Button
      key={item.id}
      variant="outlined"
      className={i === activeIdx ? classes.listButtonActive : classes.listButton}
      onClick={() => setBicycleRouteState(i, item.name_fi)}
    >
      <Typography variant="body2">
        {selectRouteName(currentLocale, item.name_fi, item.name_en, item.name_sv)}
      </Typography>
    </Button>
  ));

  const renderCultureRoutes = (inputData, activeIdx) => inputData.map((item, i) => (
    <Button
      key={item.id}
      variant="outlined"
      className={i === activeIdx ? classes.listButtonActive : classes.listButton}
      onClick={() => setCultureRouteState(item.id, i)}
    >
      <Typography variant="body2">{selectRouteName(currentLocale, item.name, item.name_en, item.name_sv)}</Typography>
    </Button>
  ));

  const renderSettings = (settingVisibility, typeVal) => {
    if (settingVisibility) {
      return typeVal.map(item => formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue));
    }
    return null;
  };

  return (
    <div className={classes.content}>
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
              {renderSettings(openWalkSettings, walkingControlTypes)}
              <div className={openCultureRouteList ? classes.border : null}>
                {cultureRouteId
                  ? cultureRouteList
                    .filter(route => route.id === cultureRouteId)
                    .map(route => (
                      <Description
                        key={route.id}
                        route={route}
                        currentLocale={currentLocale}
                        showDescriptionText={showDescriptionText}
                        setShowDescriptionText={setShowDescriptionText}
                      />
                    ))
                  : null}
                {openCultureRouteList && !cultureRouteId ? emptyRouteList(cultureRouteList) : null}
              </div>
              {openCultureRouteList && (currentLocale === 'en' || currentLocale === 'sv')
                ? renderCultureRoutes(filteredCultureRouteList, cultureRouteIndex)
                : null}
              {openCultureRouteList && currentLocale === 'fi'
                ? renderCultureRoutes(cultureRouteList, cultureRouteIndex)
                : null}
              <div className={classes.buttonContainer}>
                {buttonComponent(
                  bicycleSettingsToggle,
                  openBicycleSettings,
                  iconBicycle,
                  'mobilityPlatform.menu.title.bicycle',
                )}
              </div>
              {renderSettings(openBicycleSettings, bicycleControlTypes)}
              <div className={openBicycleRouteList ? classes.border : null}>
                {bicycleRouteName
                  ? bicycleRouteList
                    .filter(bicycleRoute => bicycleRoute.name_fi === bicycleRouteName)
                    .map(bicycleRoute => <RouteLength key={bicycleRoute.id} route={bicycleRoute} />)
                  : null}
                {openBicycleRouteList && !bicycleRouteName ? emptyRouteList(bicycleRouteList) : null}
              </div>
              {openBicycleRouteList ? renderBicycleRoutes(bicycleRouteList, bicycleRouteIndex) : null}
              <>
                {showSnowPlows && (
                  <div className={classes.container}>
                    <div className={classes.paragraph}>
                      <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'mobilityPlatform.settings.streetMaintenance.info' })}
                      </Typography>
                    </div>
                    <div className={classes.buttonList}>
                      {timeStepTypes.map((item, i) => (
                        <Button
                          key={item.type}
                          className={i === stepButtonIndex ? classes.buttonStepActive : classes.buttonStep}
                          onClick={() => setSnowplowState(item.type, i)}
                        >
                          <Typography variant="body2">{item.title}</Typography>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            </>
          </FormGroup>
        </FormControl>
      </div>
      {showEcoCounter ? <InfoTextBox infoText="mobilityPlatform.info.ecoCounter" /> : null}
      {showBicycleStands ? <InfoTextBox infoText="mobilityPlatform.info.bicycleStands" /> : null}
    </div>
  );
};

MobilitySettingsView.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MobilitySettingsView;

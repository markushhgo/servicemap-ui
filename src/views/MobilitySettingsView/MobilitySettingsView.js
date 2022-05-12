import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Typography, FormGroup, FormControl, FormControlLabel, Switch, Button,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
import MobilityPlatformContext from '../../context/MobilityPlatformContext';
import {
  fetchCultureRouteNames,
  fetchBicycleRouteNames,
  fetchMobilityMapPolygons,
} from '../../components/MobilityPlatform/mobilityPlatformRequests/mobilityPlatformRequests';
import { selectRouteName } from '../../components/MobilityPlatform/utils/utils';
import TitleBar from '../../components/TitleBar';
import InfoTextBox from '../../components/MobilityPlatform/InfoTextBox';
import Description from './components/Description';
import RouteLength from './components/RouteLength';
import iconWalk from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_walk.svg';
import iconBicycle from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle.svg';
import iconCar from '../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_car.svg';

const MobilitySettingsView = ({ classes, intl }) => {
  const [openWalkSettings, setOpenWalkSettings] = useState(false);
  const [openBicycleSettings, setOpenBicycleSettings] = useState(false);
  const [openCarSettings, setOpenCarSettings] = useState(false);
  const [openCultureRouteList, setOpenCultureRouteList] = useState(false);
  const [cultureRouteList, setCultureRouteList] = useState([]);
  const [localizedCultureRoutes, setLocalizedCultureRoutes] = useState([]);
  const [showDescriptionText, setShowDescriptionText] = useState(true);
  const [cultureRouteIndex, setCultureRouteIndex] = useState(null);
  const [bicycleRouteList, setBicycleRouteList] = useState([]);
  const [openBicycleRouteList, setOpenBicycleRouteList] = useState(false);
  const [bicycleRouteIndex, setBicycleRouteIndex] = useState(null);
  const [openSpeedLimitList, setOpenSpeedLimitList] = useState(false);

  const {
    setOpenMobilityPlatform,
    showEcoCounter,
    setShowEcoCounter,
    showBicycleStands,
    setShowBicycleStands,
    showCultureRoutes,
    setShowCultureRoutes,
    cultureRouteId,
    setCultureRouteId,
    showBicycleRoutes,
    setShowBicycleRoutes,
    bicycleRouteName,
    setBicycleRouteName,
    showRentalCars,
    setShowRentalCars,
    showGasFillingStations,
    setShowGasFillingStations,
    showSpeedLimitZones,
    setShowSpeedLimitZones,
    speedLimit,
    setSpeedLimit,
    speedLimitZones,
    setSpeedLimitZones,
  } = useContext(MobilityPlatformContext);

  const locale = useSelector(state => state.user.locale);

  useEffect(() => {
    setOpenMobilityPlatform(true);
  }, [setOpenMobilityPlatform]);

  /**
   * Fetch list of routes
   * @param {('react').SetStateAction}
   * @returns {Array} and sets it into state
   */
  useEffect(() => {
    fetchCultureRouteNames(setCultureRouteList);
  }, [setCultureRouteList]);

  useEffect(() => {
    fetchBicycleRouteNames(setBicycleRouteList);
  }, [setBicycleRouteList]);

  useEffect(() => {
    fetchMobilityMapPolygons('SLZ', 1000, setSpeedLimitZones);
  }, [setSpeedLimitZones]);

  /**
   * Check is visibility boolean values are true
   * This would be so if user has not hid them, but left mobility map before returning
   * @param {Boolean} visibility
   * @param {('react').SetStateAction}
   */
  const checkVisibilityValues = (visibility, setSettings) => {
    if (visibility) {
      setSettings(true);
    }
  };

  useEffect(() => {
    checkVisibilityValues(showBicycleStands, setOpenBicycleSettings);
  }, [showBicycleStands]);

  useEffect(() => {
    checkVisibilityValues(showBicycleRoutes, setOpenBicycleSettings);
    checkVisibilityValues(showBicycleRoutes, setOpenBicycleRouteList);
  }, [showBicycleRoutes]);

  useEffect(() => {
    checkVisibilityValues(showCultureRoutes, setOpenWalkSettings);
    checkVisibilityValues(showCultureRoutes, setOpenCultureRouteList);
  }, [showCultureRoutes]);

  useEffect(() => {
    checkVisibilityValues(showSpeedLimitZones, setOpenSpeedLimitList);
  }, [showSpeedLimitZones]);

  useEffect(() => {
    if (showEcoCounter) {
      setOpenWalkSettings(true);
      setOpenBicycleSettings(true);
    }
  }, [showEcoCounter]);

  useEffect(() => {
    checkVisibilityValues(showRentalCars, setOpenCarSettings);
    checkVisibilityValues(showGasFillingStations, setOpenCarSettings);
    checkVisibilityValues(showSpeedLimitZones, setOpenCarSettings);
  }, [showRentalCars, showGasFillingStations, showSpeedLimitZones]);

  const nameKeys = {
    fi: 'name',
    en: 'name_en',
    sv: 'name_sv',
  };

  /**
   * @param {Array and locale}
   * @function filter array
   * @returns {Array and ('react').SetStateAction}
   */
  useEffect(() => {
    if (cultureRouteList && cultureRouteList.length > 0) {
      setLocalizedCultureRoutes(cultureRouteList.filter(item => item[nameKeys[locale]]));
    }
  }, [cultureRouteList, locale]);

  /**
   * Sort routes in alphapethical order based on current locale.
   * If locale is not finnish the filtered list is used.
   * @param {Array && locale}
   * @function sort
   * @returns {Array}
   */
  useEffect(() => {
    if (cultureRouteList && cultureRouteList.length > 0 && locale === 'fi') {
      cultureRouteList.sort((a, b) => a[nameKeys[locale]].localeCompare(b[nameKeys[locale]]));
    } else if (localizedCultureRoutes && localizedCultureRoutes.length > 0 && locale !== 'fi') {
      localizedCultureRoutes.sort((a, b) => a[nameKeys[locale]].localeCompare(b[nameKeys[locale]]));
    }
  }, [cultureRouteList, localizedCultureRoutes, locale]);

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
      bicycleRouteList.sort((a, b) => a[objKeys[locale]].localeCompare(b[objKeys[locale]], undefined, {
        numeric: true,
        sensivity: 'base',
      }));
    }
  }, [bicycleRouteList, locale]);

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

  const carSettingsToggle = () => {
    setOpenCarSettings(current => !current);
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

  const rentalCarsToggle = () => {
    setShowRentalCars(current => !current);
  };

  const gasFillingStationsToggle = () => {
    setShowGasFillingStations(current => !current);
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

  const setBicycleRouteState = (index, routeName) => {
    setBicycleRouteIndex(index);
    setBicycleRouteName(routeName);
    setShowBicycleRoutes(true);
  };

  const speedLimitZonesToggle = () => {
    setOpenSpeedLimitList(current => !current);
    setShowSpeedLimitZones(current => !current);
    if (speedLimit) {
      setSpeedLimit(null);
    }
  };

  const setSpeedLimitState = (limitVal) => {
    setSpeedLimit(limitVal);
    setShowSpeedLimitZones(true);
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
  ];

  const carControlTypes = [
    {
      type: 'rentalCars',
      msgId: 'mobilityPlatform.menu.showRentalCars',
      checkedValue: showRentalCars,
      onChangeValue: rentalCarsToggle,
    },
    {
      type: 'gasFillingStations',
      msgId: 'mobilityPlatform.menu.showGasFillingStations',
      checkedValue: showGasFillingStations,
      onChangeValue: gasFillingStationsToggle,
    },
    {
      type: 'speedLimitZones',
      msgId: 'mobilityPlatform.menu.speedLimitZones.show',
      checkedValue: openSpeedLimitList,
      onChangeValue: speedLimitZonesToggle,
    },
  ];

  const formLabel = (keyVal, msgId, checkedValue, onChangeValue) => (
    <FormControlLabel
      key={keyVal}
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
        <Switch
          checked={checkedValue}
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

  const buttonComponent = (onClickFunc, settingState, iconName, translationId) => (
    <Button
      onClick={() => onClickFunc()}
      variant="outlined"
      className={settingState ? `${classes.buttonPrimary} ${classes.active}` : classes.buttonPrimary}
      aria-label={intl.formatMessage({
        id: translationId,
      })}
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
          <Typography
            component="p"
            variant="subtitle2"
            aria-label={
              input.length > 0
                ? intl.formatMessage({ id: 'mobilityPlatform.menu.routes.info' })
                : intl.formatMessage({ id: 'mobilityPlatform.menu.routes.emptyList' })
            }
          >
            {input.length > 0
              ? intl.formatMessage({ id: 'mobilityPlatform.menu.routes.info' })
              : intl.formatMessage({ id: 'mobilityPlatform.menu.routes.emptyList' })}
          </Typography>
        </div>
      );
    }
    return null;
  };

  const renderBicycleRoutes = (inputData, activeIdx) => inputData
    && inputData.length > 0
    && inputData.map((item, i) => (
      <Button
        key={item.id}
        variant="outlined"
        className={i === activeIdx ? `${classes.buttonSecondary} ${classes.active}` : classes.buttonSecondary}
        onClick={() => setBicycleRouteState(i, item.name_fi)}
      >
        <Typography variant="body2" aria-label={selectRouteName(locale, item.name_fi, item.name_en, item.name_sv)}>
          {selectRouteName(locale, item.name_fi, item.name_en, item.name_sv)}
        </Typography>
      </Button>
    ));

  const renderCultureRoutes = (inputData, activeIdx) => inputData
    && inputData.length > 0
    && inputData.map((item, i) => (
      <Button
        key={item.id}
        variant="outlined"
        className={i === activeIdx ? `${classes.buttonSecondary} ${classes.active}` : classes.buttonSecondary}
        onClick={() => setCultureRouteState(item.id, i)}
      >
        <Typography variant="body2" aria-label={selectRouteName(locale, item.name, item.name_en, item.name_sv)}>
          {selectRouteName(locale, item.name, item.name_en, item.name_sv)}
        </Typography>
      </Button>
    ));

  const renderSettings = (settingVisibility, typeVal) => {
    if (settingVisibility) {
      return typeVal.map(item => formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue));
    }
    return null;
  };

  const speedLimitList = [...new Set(speedLimitZones.map(item => item.extra.speed_limit))];

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
                        currentLocale={locale}
                        showDescriptionText={showDescriptionText}
                        setShowDescriptionText={setShowDescriptionText}
                      />
                    ))
                  : null}
                {openCultureRouteList && !cultureRouteId ? emptyRouteList(cultureRouteList) : null}
              </div>
              {openCultureRouteList && (locale === 'en' || locale === 'sv')
                ? renderCultureRoutes(localizedCultureRoutes, cultureRouteIndex)
                : null}
              {openCultureRouteList && locale === 'fi'
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
                <div className={classes.buttonContainer}>
                  {buttonComponent(carSettingsToggle, openCarSettings, iconCar, 'mobilityPlatform.menu.title.car')}
                </div>
                {renderSettings(openCarSettings, carControlTypes)}
                {openSpeedLimitList ? (
                  <>
                    <div className={classes.paragraph}>
                      {!speedLimit ? (
                        <Typography variant="subtitle2">
                          {intl.formatMessage({ id: 'mobilityPlatform.menu.speedLimitZones.select' })}
                        </Typography>
                      ) : (
                        <Typography variant="subtitle2">
                          {intl.formatMessage({ id: 'mobilityPlatform.menu.speedLimitZones.zone' })}
                          :
                          {' '}
                          {speedLimit}
                          {' '}
                          km/h
                        </Typography>
                      )}
                    </div>
                    <div className={classes.buttonList}>
                      {openSpeedLimitList && speedLimitList.length > 0 && speedLimitList.map(item => (
                        <Button
                          key={item}
                          variant="outlined"
                          className={item === speedLimit ? `${classes.buttonSmall} ${classes.active}` : classes.buttonSmall}
                          onClick={() => setSpeedLimitState(item)}
                        >
                          <Typography variant="body2">
                            {item}
                            {' '}
                            km/h
                          </Typography>
                        </Button>
                      ))}
                    </div>
                  </>
                ) : null}
              </>
            </>
          </FormGroup>
        </FormControl>
      </div>
      {showBicycleStands ? <InfoTextBox infoText="mobilityPlatform.info.bicycleStands" /> : null}
      {showEcoCounter ? <InfoTextBox infoText="mobilityPlatform.info.ecoCounter" /> : null}
      {showRentalCars ? <InfoTextBox infoText="mobilityPlatform.info.rentalCars" /> : null}
      {showGasFillingStations ? <InfoTextBox infoText="mobilityPlatform.info.gasFillingStations" /> : null}
    </div>
  );
};

MobilitySettingsView.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MobilitySettingsView;

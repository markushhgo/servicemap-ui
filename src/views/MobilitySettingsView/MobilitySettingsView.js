import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Typography, FormGroup, FormControl, FormControlLabel, Switch, Button, Checkbox,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
import iconWalk from 'servicemap-ui-turku/assets/icons/icons-icon_walk.svg';
import iconBicycle from 'servicemap-ui-turku/assets/icons/icons-icon_bicycle.svg';
import iconCar from 'servicemap-ui-turku/assets/icons/icons-icon_car.svg';
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
import ExtendedInfo from './components/ExtendedInfo';

const MobilitySettingsView = ({ classes, intl }) => {
  const [openWalkSettings, setOpenWalkSettings] = useState(false);
  const [openBicycleSettings, setOpenBicycleSettings] = useState(false);
  const [openCarSettings, setOpenCarSettings] = useState(false);
  const [openCultureRouteList, setOpenCultureRouteList] = useState(false);
  const [cultureRouteList, setCultureRouteList] = useState([]);
  const [localizedCultureRoutes, setLocalizedCultureRoutes] = useState([]);
  const [bicycleRouteList, setBicycleRouteList] = useState([]);
  const [openBicycleRouteList, setOpenBicycleRouteList] = useState(false);
  const [openSpeedLimitList, setOpenSpeedLimitList] = useState(false);
  const [openParkingChargeZoneList, setOpenParkingChargeZoneList] = useState(false);

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
    showChargingStations,
    setShowChargingStations,
    showParkingSpaces,
    setShowParkingSpaces,
    parkingChargeZones,
    setParkingChargeZones,
    parkingChargeZoneId,
    setParkingChargeZoneId,
    showParkingChargeZones,
    setShowParkingChargeZones,
    showBikeServiceStations,
    setShowBikeServiceStations,
    showSpeedLimitZones,
    setShowSpeedLimitZones,
    speedLimitSelections,
    setSpeedLimitSelections,
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

  useEffect(() => {
    fetchMobilityMapPolygons('PAZ', 10, setParkingChargeZones);
  }, [setParkingChargeZones]);

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
    checkVisibilityValues(showBikeServiceStations, setOpenBicycleSettings);
  }, [showBicycleStands, showBikeServiceStations]);

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
    checkVisibilityValues(showParkingSpaces, setOpenCarSettings);
    checkVisibilityValues(showChargingStations, setOpenCarSettings);
    checkVisibilityValues(showSpeedLimitZones, setOpenCarSettings);
  }, [showRentalCars, showGasFillingStations, showParkingSpaces, showChargingStations, showSpeedLimitZones]);

  useEffect(() => {
    checkVisibilityValues(showParkingChargeZones, setOpenCarSettings);
    checkVisibilityValues(showParkingChargeZones, setOpenParkingChargeZoneList);
  }, [showParkingChargeZones]);

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

  const parkingSpacesToggle = () => {
    setShowParkingSpaces(current => !current);
  };

  const rentalCarsToggle = () => {
    setShowRentalCars(current => !current);
  };

  const gasFillingStationsToggle = () => {
    setShowGasFillingStations(current => !current);
  };

  const chargingStationsToggle = () => {
    setShowChargingStations(current => !current);
  };

  const bikeServiceStationsToggle = () => {
    setShowBikeServiceStations(current => !current);
  };

  const cultureRouteListToggle = () => {
    setOpenCultureRouteList(current => !current);
    if (cultureRouteId) {
      setCultureRouteId(null);
    }
    if (showCultureRoutes) {
      setShowCultureRoutes(false);
    }
  };

  const bicycleRouteListToggle = () => {
    setOpenBicycleRouteList(current => !current);
    if (bicycleRouteName) {
      setBicycleRouteName(null);
    }
    if (showBicycleRoutes) {
      setShowCultureRoutes(false);
    }
  };

  /**
   * Stores previous value
   */
  const prevCultureRouteIdRef = useRef();

  useEffect(() => {
    prevCultureRouteIdRef.current = cultureRouteId;
  }, [cultureRouteId]);

  /**
   * If user clicks same route again, then reset id and set visiblity to false
   * Otherwise new values are set
   */
  const setCultureRouteState = (itemId) => {
    setCultureRouteId(itemId);
    setShowCultureRoutes(true);
    if (itemId === prevCultureRouteIdRef.current) {
      setCultureRouteId(null);
      setShowCultureRoutes(false);
    }
  };

  /**
   * Stores previous value
   */
  const prevBicycleRouteNameRef = useRef();

  /**
   * If user clicks same route again, then reset name and set visiblity to false
   * Otherwise new values are set
   */
  useEffect(() => {
    prevBicycleRouteNameRef.current = bicycleRouteName;
  }, [bicycleRouteName]);

  const setBicycleRouteState = (routeName) => {
    setBicycleRouteName(routeName);
    setShowBicycleRoutes(true);
    if (routeName === prevBicycleRouteNameRef.current) {
      setBicycleRouteName(null);
      setShowBicycleRoutes(false);
    }
  };

  const speedLimitZonesToggle = () => {
    setOpenSpeedLimitList(current => !current);
    setShowSpeedLimitZones(current => !current);
    if (speedLimitSelections && speedLimitSelections.length > 0) {
      setSpeedLimitSelections([]);
    }
  };

  const setSpeedLimitState = (limitVal) => {
    if (!speedLimitSelections.includes(limitVal)) {
      setSpeedLimitSelections(speedLimitSelections => [...speedLimitSelections, limitVal]);
      setShowSpeedLimitZones(true);
    } else setSpeedLimitSelections(speedLimitSelections.filter(item => item !== limitVal));
  };

  const parkingChargeZonesListToggle = () => {
    setOpenParkingChargeZoneList(current => !current);
    if (showParkingChargeZones) {
      setShowParkingChargeZones(false);
    }
    if (parkingChargeZoneId) {
      setParkingChargeZoneId(null);
    }
  };

  /**
   * Stores previous value
   */
  const prevParkingChargeZoneIdRef = useRef();

  useEffect(() => {
    prevParkingChargeZoneIdRef.current = parkingChargeZoneId;
  }, [parkingChargeZoneId]);

  /**
   * If user clicks same route again, then reset id and set visiblity to false
   * Otherwise new values are set
   */

  const selectParkingChargeZone = (id) => {
    setParkingChargeZoneId(id);
    setShowParkingChargeZones(true);
    if (id === prevParkingChargeZoneIdRef.current) {
      setParkingChargeZoneId(null);
      setShowParkingChargeZones(false);
    }
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
      type: 'bikeServiceStations',
      msgId: 'mobilityPlatform.menu.showBikeServiceStations',
      checkedValue: showBikeServiceStations,
      onChangeValue: bikeServiceStationsToggle,
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
      type: 'chargingStations',
      msgId: 'mobilityPlatform.menu.showChargingStations',
      checkedValue: showChargingStations,
      onChangeValue: chargingStationsToggle,
    },
    {
      type: 'gasFillingStations',
      msgId: 'mobilityPlatform.menu.showGasFillingStations',
      checkedValue: showGasFillingStations,
      onChangeValue: gasFillingStationsToggle,
    },
    {
      type: 'parkingSpaces',
      msgId: 'mobilityPlatform.menu.showParkingSpaces',
      checkedValue: showParkingSpaces,
      onChangeValue: parkingSpacesToggle,
    },
    {
      type: 'parkingChargeZones',
      msgId: 'mobilityPlatform.menu.showParkingChargeZones',
      checkedValue: openParkingChargeZoneList,
      onChangeValue: parkingChargeZonesListToggle,
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
      className={settingState ? `${classes.button} ${classes.active}` : classes.button}
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

  const renderBicycleRoutes = inputData => inputData
    && inputData.length > 0
    && inputData.map(item => (
      <div key={item.id} className={classes.checkBoxContainer}>
        <FormControlLabel
          control={(
            <Checkbox
              checked={item.name_fi === bicycleRouteName}
              aria-checked={item.name_fi === bicycleRouteName}
              className={classes.margin}
              onChange={() => setBicycleRouteState(item.name_fi)}
            />
        )}
          label={(
            <Typography variant="body2" aria-label={selectRouteName(locale, item.name_fi, item.name_en, item.name_sv)}>
              {selectRouteName(locale, item.name_fi, item.name_en, item.name_sv)}
            </Typography>
         )}
        />
        {item.name_fi === bicycleRouteName ? (<RouteLength key={item.id} route={item} />) : null}
      </div>
    ));

  const renderCultureRoutes = inputData => inputData
    && inputData.length > 0
    && inputData.map(item => (
      <div key={item.id} className={classes.checkBoxContainer}>
        <FormControlLabel
          control={(
            <Checkbox
              checked={item.id === cultureRouteId}
              aria-checked={item.id === cultureRouteId}
              className={classes.margin}
              onChange={() => setCultureRouteState(item.id)}
            />
      )}
          label={(
            <Typography variant="body2" aria-label={selectRouteName(locale, item.name, item.name_en, item.name_sv)}>
              {selectRouteName(locale, item.name, item.name_en, item.name_sv)}
            </Typography>
      )}
        />
        {item.id === cultureRouteId ? (
          <Description
            key={item.name}
            route={item}
            currentLocale={locale}
          />
        ) : null}
      </div>
    ));

  const renderSettings = (settingVisibility, typeVal) => {
    if (settingVisibility) {
      return typeVal.map(item => formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue));
    }
    return null;
  };

  const speedLimitList = [...new Set(speedLimitZones.map(item => item.extra.speed_limit))];
  const speedLimitSuffix = locale === 'fi' ? 'km/t' : 'km/h';

  const renderSpeedLimits = () => (
    <>
      <div className={`${classes.paragraph} ${classes.border}`}>
        <Typography variant="subtitle2" aria-label={intl.formatMessage({ id: 'mobilityPlatform.menu.speedLimitZones.select' })}>
          {intl.formatMessage({ id: 'mobilityPlatform.menu.speedLimitZones.select' })}
        </Typography>
      </div>
      <div className={classes.buttonList}>
        {openSpeedLimitList && speedLimitList.length > 0 && speedLimitList.map(item => (
          <div key={item} className={classes.checkBoxContainer}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={speedLimitSelections.includes(item)}
                  aria-checked={speedLimitSelections.includes(item)}
                  className={classes.margin}
                  onChange={() => setSpeedLimitState(item)}
                />
            )}
              label={(
                <Typography variant="body2" aria-label={`${item} ${speedLimitSuffix}`}>
                  {item}
                  {' '}
                  {speedLimitSuffix}
                </Typography>
            )}
            />
          </div>
        ))}
      </div>
    </>
  );

  const renderParkingChargeZoneList = () => (
    <>
      {parkingChargeZones
        && parkingChargeZones.length > 0
        && parkingChargeZones.map(item => (
          <div key={item.id} className={classes.checkBoxContainer}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={item.id === parkingChargeZoneId}
                  aria-checked={item.id === parkingChargeZoneId}
                  className={classes.margin}
                  onChange={() => selectParkingChargeZone(item.id)}
                />
              )}
              label={(
                <Typography
                  variant="body2"
                  aria-label={`${intl.formatMessage({ id: 'mobilityPlatform.menu.parkingChargeZones.subtitle' })} ${
                    item.extra.maksuvyohyke
                  }`}
                >
                  {intl.formatMessage({ id: 'mobilityPlatform.menu.parkingChargeZones.subtitle' })}
                  {' '}
                  {item.extra.maksuvyohyke}
                </Typography>
              )}
            />
          </div>
        ))}
    </>
  );

  const chargeZoneTranslations = {
    message1: 'mobilityPlatform.info.parkingChargeZones.paragraph.1',
    message2: 'mobilityPlatform.info.parkingChargeZones.paragraph.2',
    message3: 'mobilityPlatform.info.parkingChargeZones.paragraph.3',
    zones: [
      'mobilityPlatform.info.parkingChargeZones.zone.1',
      'mobilityPlatform.info.parkingChargeZones.zone.2',
      'mobilityPlatform.info.parkingChargeZones.zone.3',
    ],
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
                {openCultureRouteList && !cultureRouteId ? emptyRouteList(cultureRouteList) : null}
              </div>
              {openCultureRouteList && (locale === 'en' || locale === 'sv')
                ? renderCultureRoutes(localizedCultureRoutes)
                : null}
              {openCultureRouteList && locale === 'fi' ? renderCultureRoutes(cultureRouteList) : null}
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
                {openBicycleRouteList && !bicycleRouteName ? emptyRouteList(bicycleRouteList) : null}
              </div>
              {openBicycleRouteList ? renderBicycleRoutes(bicycleRouteList) : null}
              <>
                <div className={classes.buttonContainer}>
                  {buttonComponent(carSettingsToggle, openCarSettings, iconCar, 'mobilityPlatform.menu.title.car')}
                </div>
                {renderSettings(openCarSettings, carControlTypes)}
                {openSpeedLimitList ? (
                  renderSpeedLimits()
                ) : null}
              </>
              {openParkingChargeZoneList ? renderParkingChargeZoneList() : null}
            </>
          </FormGroup>
        </FormControl>
      </div>
      {showBicycleStands ? <InfoTextBox infoText="mobilityPlatform.info.bicycleStands" /> : null}
      {showEcoCounter ? <InfoTextBox infoText="mobilityPlatform.info.ecoCounter" /> : null}
      {showRentalCars ? <InfoTextBox infoText="mobilityPlatform.info.rentalCars" /> : null}
      {showChargingStations ? <InfoTextBox infoText="mobilityPlatform.info.chargingStations" /> : null}
      {showGasFillingStations ? <InfoTextBox infoText="mobilityPlatform.info.gasFillingStations" /> : null}
      {showParkingSpaces ? <InfoTextBox infoText="mobilityPlatform.info.parkingSpaces" /> : null}
      {openParkingChargeZoneList ? <ExtendedInfo translations={chargeZoneTranslations} /> : null}
    </div>
  );
};

MobilitySettingsView.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MobilitySettingsView;

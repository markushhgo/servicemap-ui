import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, FormGroup, FormControl, FormControlLabel, Switch, Button,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import MobilityPlatformContext from '../../context/MobilityPlatformContext';
import {
  fetchCultureRoutesGroup,
  fetchBicycleRouteNames,
} from '../../components/MobilityPlatform/mobilityPlatformRequests/mobilityPlatformRequests';
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
  const [openCultureRouteList, setOpenCultureRouteList] = useState(false);
  const [cultureRouteList, setCultureRouteList] = useState(null);
  const [filteredCultureRouteList, setFilteredCultureRouteList] = useState(null);
  const [cultureRouteDesc, setCultureRouteDesc] = useState(null);
  const [cultureRouteIndex, setCultureRouteIndex] = useState(null);
  const [currentLocale, setCurrentLocale] = useState('fi');
  const [showDescriptionText, setShowDescriptionText] = useState(false);
  const [bicycleRouteList, setBicycleRouteList] = useState(null);
  const [showBicycleRouteList, setShowBicycleRouteList] = useState(false);
  const [bicycleRouteLength, setBicycleRouteLength] = useState(null);
  const [showBicycleRouteLength, setShowBicycleRouteLength] = useState(false);
  const [bicycleRouteIndex, setBicycleRouteIndex] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);

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
    showCultureRoutes,
    setShowCultureRoutes,
    setCultureRouteId,
    setShowBicycleRoutes,
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

  useEffect(() => {
    if (apiUrl) {
      fetchCultureRoutesGroup(apiUrl, setCultureRouteList);
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

  const carSettingsToggle = () => {
    setOpenCarSettings(current => !current);
  };

  /**
   * Toggle functions for content types
   * @var {Boolean}
   * @returns {Boolean}
   */
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

  const cultureRouteListToggle = () => {
    setOpenCultureRouteList(current => !current);
    setShowCultureRoutes(current => !current);
    setShowDescriptionText(current => !current);
    if (cultureRouteDesc) {
      setCultureRouteDesc(null);
    }
    if (cultureRouteIndex) {
      setCultureRouteIndex(null);
    }
    if (showCultureRoutes) {
      setShowCultureRoutes(false);
    }
  };

  const bicycleRouteListToggle = () => {
    setShowBicycleRouteList(current => !current);
    setShowBicycleRoutes(current => !current);
    setShowBicycleRouteLength(current => !current);
    if (bicycleRouteLength) {
      setBicycleRouteLength(null);
    }
    if (bicycleRouteIndex) {
      setBicycleRouteIndex(null);
    }
  };

  const selectRouteDescription = (descriptionSv, descriptionEn, descriptionFi) => {
    if (currentLocale === 'sv' && descriptionSv) {
      setCultureRouteDesc(descriptionSv);
    } else if (currentLocale === 'en' && descriptionEn) {
      setCultureRouteDesc(descriptionEn);
    } else {
      setCultureRouteDesc(descriptionFi);
    }
  };

  const setCultureRouteState = (descriptionSV, descriptionEN, descriptionFI, itemId, index) => {
    selectRouteDescription(descriptionSV, descriptionEN, descriptionFI);
    setCultureRouteId(itemId);
    setCultureRouteIndex(index);
    setShowCultureRoutes(true);
  };

  const formatBicycleRoutelength = (inputLength) => {
    setBicycleRouteLength(Math.round(inputLength / 1000));
  };

  const setBicycleRouteState = (index, inputLength, routeName) => {
    setBicycleRouteIndex(index);
    formatBicycleRoutelength(inputLength);
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
  ];

  const bicycleControlTypes = [
    {
      type: 'bicycleRoutes',
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

  const descriptionComponent = (
    <div className={classes.descriptionContainer}>
      <div className={classes.subtitle}>
        <Button
          className={classes.buttonWhite}
          onClick={() => (showDescriptionText ? setShowDescriptionText(false) : setShowDescriptionText(true))}
        >
          <Typography className={classes.toggleText} variant="body1">
            {intl.formatMessage({
              id: 'mobilityPlatform.info.description.title',
            })}
          </Typography>
          {showDescriptionText ? <ArrowDropUp /> : <ArrowDropDown />}
        </Button>
      </div>
      {showDescriptionText ? (
        <div className={classes.paragraph}>
          <Typography component="p" variant="body2">
            {cultureRouteDesc}
          </Typography>
        </div>
      ) : null}
    </div>
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
          <Typography variant="subtitle2">
            {input.length > 0
              ? intl.formatMessage({ id: 'mobilityPlatform.menu.routes.info' })
              : intl.formatMessage({ id: 'mobilityPlatform.menu.routes.emptyList' })}
          </Typography>
        </div>
      );
    } return null;
  };

  const renderList = inputData => inputData.map((item, i) => (
    <Button
      key={item.id}
      variant="outlined"
      aria-pressed={item.name}
      className={i === cultureRouteIndex ? classes.buttonSmallActive : classes.buttonSmall}
      onClick={() => setCultureRouteState(item.description_sv, item.description_en, item.description, item.id, i)}
    >
      <Typography variant="body2">{selectRouteName(currentLocale, item.name, item.name_en, item.name_sv)}</Typography>
    </Button>
  ));

  const routeLengthComponent = (
    <div className={classes.border}>
      {bicycleRouteLength ? (
        <div className={classes.paragraph}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.title' })}
          </Typography>
          <Typography variant="body2">
            {intl.formatMessage({ id: 'mobilityPlatform.menu.bicycleRoutes.length' })}
            {' '}
            {bicycleRouteLength}
            {' '}
            km.
          </Typography>
        </div>
      ) : (
        <>{emptyRouteList(bicycleRouteList)}</>
      )}
    </div>
  );

  const routeListComponent = (inputData, activeIdx, setRouteState) => inputData.map((item, i) => (
    <Button
      key={item.id}
      variant="outlined"
      className={i === activeIdx ? classes.buttonSmallActive : classes.buttonSmall}
      aria-pressed={item.name_fi}
      onClick={() => setRouteState(i, item.length, item.name_fi)}
    >
      <Typography variant="body2">
        {selectRouteName(currentLocale, item.name_fi, item.name_en, item.name_sv)}
      </Typography>
    </Button>
  ));

  const renderSettings = (settingVisibility, typeVal) => {
    if (settingVisibility) {
      return typeVal.map(item => formLabel(item.type, item.msgId, item.checkedValue, item.onChangeValue));
    }
    return null;
  };

  const renderDescription = (descriptionVisibility, descriptionComp) => {
    if (descriptionVisibility) {
      return descriptionComp;
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
              <>{renderSettings(openWalkSettings, walkingControlTypes)}</>
              <div className={openCultureRouteList ? classes.border : null}>
                {cultureRouteDesc ? descriptionComponent : null}
                {openCultureRouteList && !cultureRouteDesc ? emptyRouteList(cultureRouteList) : null}
              </div>
              {openCultureRouteList && (currentLocale === 'en' || currentLocale === 'sv')
                ? renderList(filteredCultureRouteList)
                : null}
              {openCultureRouteList && currentLocale === 'fi' ? renderList(cultureRouteList) : null}
              <div className={classes.buttonContainer}>
                {buttonComponent(
                  bicycleSettingsToggle,
                  openBicycleSettings,
                  iconBicycle,
                  'mobilityPlatform.menu.title.bicycle',
                )}
              </div>
              <>
                {renderSettings(openBicycleSettings, bicycleControlTypes)}
                {renderDescription(showBicycleRouteLength, routeLengthComponent)}
              </>
              {showBicycleRouteList
                ? routeListComponent(bicycleRouteList, bicycleRouteIndex, setBicycleRouteState)
                : null}
              <div className={classes.buttonContainer}>
                {buttonComponent(carSettingsToggle, openCarSettings, iconCar, 'mobilityPlatform.menu.title.car')}
              </div>
              {renderSettings(openCarSettings, carControlTypes)}
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

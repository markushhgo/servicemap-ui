import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Link, ButtonBase } from '@material-ui/core';
import OptionalA11yText from '../OptionalA11yText';

const OptionalText = ({ classes, intl, locale }) => {
  const [feedbackLink, setFeedbackLink] = useState(null);
  const [serviceDirectoryLink, setServiceDirectoryLink] = useState(null);
  const [showA11y, setShowA11y] = useState(false);

  const appLink = 'https://github.com/City-of-Turku/servicemap-ui/';
  const apiLink = 'https://github.com/City-of-Turku/smbackend/';
  const guideMapLink = 'https://opaskartta.turku.fi';
  const openStreetMapLink = 'https://www.openstreetmap.org/';
  const serviceCatalogApiLink = 'https://api.palvelutietovaranto.suomi.fi/swagger/ui/index.html';
  const dataDescriptionServiceLink = 'https://rekisteri.turku.fi/Saabe_data/';

  const searchOptions = [
    intl.formatMessage({ id: 'info.view.searchOptions.healthStation' }),
    intl.formatMessage({ id: 'info.view.searchOptions.school' }),
    intl.formatMessage({ id: 'info.view.searchOptions.dayCare' }),
    intl.formatMessage({ id: 'info.view.searchOptions.swimming' }),
    intl.formatMessage({ id: 'info.view.searchOptions.sportsField' }),
    intl.formatMessage({ id: 'info.view.searchOptions.library' }),
    intl.formatMessage({ id: 'info.view.searchOptions.community' }),
    intl.formatMessage({ id: 'info.view.searchOptions.units' }),
    intl.formatMessage({ id: 'info.view.searchOptions.address' }),
  ];

  const searchOrderOptions = [
    intl.formatMessage({ id: 'info.view.searchOrder.relevant' }),
    intl.formatMessage({ id: 'info.view.searchOrder.alpha' }),
    intl.formatMessage({ id: 'info.view.searchOrder.alphaReverse' }),
    intl.formatMessage({ id: 'info.view.searchOrder.accessible' }),
    intl.formatMessage({ id: 'info.view.searchOrder.nearest' }),
  ];

  const mapOptions = [
    intl.formatMessage({ id: 'info.view.mapSettingsOptions.serviceMap' }),
    intl.formatMessage({ id: 'info.view.mapSettingsOptions.contrastMap' }),
  ];

  const setLocalizedLink = (setLink, linkUrlSv, linkUrlEn, linkUrlFi) => {
    if (locale === 'sv') {
      setLink(linkUrlSv);
    } else if (locale === 'en') {
      setLink(linkUrlEn);
    } else setLink(linkUrlFi);
  };

  useEffect(() => {
    setLocalizedLink(
      setFeedbackLink,
      'https://www.turku.fi/feedbacktjansten',
      'https://www.turku.fi/feedback',
      'https://www.turku.fi/palaute',
    );
    setLocalizedLink(
      setServiceDirectoryLink,
      'https://www.turku.fi/sv/service-directory',
      'https://www.turku.fi/en/service-directory',
      'https://www.turku.fi/palveluhakemisto',
    );
  }, [locale]);

  const renderTitle = translationId => (
    <div className={classes.title}>
      <Typography component="h3" variant="body2">
        {intl.formatMessage({ id: translationId })}
      </Typography>
    </div>
  );

  const renderParagraph = translationId => (
    <div className={classes.text}>
      <Typography color="inherit" variant="body2">
        {intl.formatMessage({ id: translationId })}
      </Typography>
    </div>
  );

  const renderList = input => (
    <ul>
      {input.map(item => (
        <li key={item}>
          <Typography variant="body2">{item}</Typography>
        </li>
      ))}
    </ul>
  );

  const renderNestedList = () => (
    <ul>
      <li>
        <Typography variant="body2">{intl.formatMessage({ id: 'info.view.accessibilityOptions.senses' })}</Typography>
        <ul>
          <li>
            <Typography variant="body2">
              {intl.formatMessage({ id: 'info.view.accessibilityOptions.senses.hearing' })}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {intl.formatMessage({ id: 'info.view.accessibilityOptions.senses.sight' })}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {intl.formatMessage({ id: 'info.view.accessibilityOptions.senses.color' })}
            </Typography>
          </li>
        </ul>
      </li>
      <li>
        <Typography variant="body2">{intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility' })}</Typography>
        <ul>
          <li>
            <Typography variant="body2">
              {intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.wheelchair' })}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.disabled' })}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.rollator' })}
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.cart' })}
            </Typography>
          </li>
        </ul>
      </li>
    </ul>
  );

  const renderLink = (link, translationId) => (
    <div className={classes.linkContainer}>
      <Link target="_blank" href={link}>
        <Typography className={classes.link} variant="body2">
          {intl.formatMessage({ id: translationId })}
        </Typography>
      </Link>
    </div>
  );

  const handleClick = () => {
    setShowA11y(current => !current);
  };

  const renderGeneralInfo = () => (
    <>
      {renderTitle('info.view.serviceInfoTitle')}
      {renderParagraph('info.view.serviceInfo')}
      {renderParagraph('info.view.guideMapInfo')}
      {renderLink(guideMapLink, 'info.view.guideMapLink')}
      {renderParagraph('info.view.developmentInfo')}
      {renderTitle('mobilityPlatform.info.title')}
      {renderParagraph('mobilityPlatform.info.statement')}
      {renderTitle('info.view.searchInfoTitle')}
      {renderParagraph('info.view.searchInfo')}
      {renderParagraph('info.view.searchErrorInfo')}
      {renderTitle('info.view.searchOptions.title')}
      {renderList(searchOptions)}
      {renderTitle('info.view.searchOrder.title')}
      {renderList(searchOrderOptions)}
      {renderTitle('info.view.addressInfoTitle')}
      {renderParagraph('info.view.addressInfo')}
      {renderTitle('info.view.serviceTreeInfoTitle')}
      {renderParagraph('info.view.serviceTreeInfo')}
      {renderTitle('info.view.settingsInfoTitle')}
      {renderParagraph('info.view.settingsInfo')}
      {renderTitle('info.view.accessibilitySettingsInfoTitle')}
      {renderParagraph('info.view.accessibilitySettingsInfoSubtitle')}
      {renderNestedList()}
      {renderParagraph('info.view.accessibilitySettingsInfo')}
      {renderTitle('info.view.mapSettingsInfoTitle')}
      {renderParagraph('info.view.mapSettingsInfo')}
      {renderList(mapOptions)}
      {renderTitle('info.view.feedbackInfoTitle')}
      {renderParagraph('info.view.feedbackInfo')}
      {renderLink(feedbackLink, 'info.view.feedback.link')}
      {renderTitle('info.view.copyrightInfoTitle')}
      {renderParagraph('info.view.copyrightInfo')}
      {renderLink(appLink, 'info.view.repository.app')}
      {renderLink(apiLink, 'info.view.repository.api')}
      {renderParagraph('info.view.openStreetInfo')}
      {renderLink(openStreetMapLink, 'info.view.openStreetMap.link')}
      {renderParagraph('info.view.usageInfo')}
      {renderParagraph('info.view.turkuServicesInfo')}
      {renderLink(serviceDirectoryLink, 'info.view.turkuServices.link')}
      {renderLink(serviceCatalogApiLink, 'info.view.serviceCatalogue.link')}
      {renderParagraph('info.view.registryInfo')}
      {renderLink(dataDescriptionServiceLink, 'info.view.dataDescriptionService.link')}
    </>
  );

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <ButtonBase onClick={() => handleClick()}>
          <Typography className={classes.button} variant="body2">
            {showA11y
              ? intl.formatMessage({ id: 'info.view.a11y.button.return' })
              : intl.formatMessage({ id: 'info.view.a11y.button.title' })}
          </Typography>
        </ButtonBase>
      </div>
      {showA11y ? <OptionalA11yText /> : renderGeneralInfo()}
    </div>
  );
};

OptionalText.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  locale: PropTypes.string.isRequired,
};

export default OptionalText;

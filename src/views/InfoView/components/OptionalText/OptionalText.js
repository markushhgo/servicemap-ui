import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Link } from '@material-ui/core';

const OptionalText = ({ classes, intl, locale }) => {
  const [feedbackLink, setFeedbackLink] = useState(null);

  useEffect(() => {
    if (locale === 'sv') {
      setFeedbackLink('https://www.turku.fi/feedbacktjansten');
    } else if (locale === 'en') {
      setFeedbackLink('https://www.turku.fi/feedback');
    } else setFeedbackLink('https://www.turku.fi/palaute');
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

  const searchOptions = [
    intl.formatMessage({ id: 'info.view.searchOptions.hospital' }),
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
        {intl.formatMessage({ id: 'info.view.accessibilityOptions.senses' })}
        <ul>
          <li>{intl.formatMessage({ id: 'info.view.accessibilityOptions.senses.hearing' })}</li>
          <li>{intl.formatMessage({ id: 'info.view.accessibilityOptions.senses.sight' })}</li>
          <li>{intl.formatMessage({ id: 'info.view.accessibilityOptions.senses.color' })}</li>
        </ul>
      </li>
      <li>
        {intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility' })}
        <ul>
          <li>{intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.wheelchair' })}</li>
          <li>{intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.disabled' })}</li>
          <li>{intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.rollator' })}</li>
          <li>{intl.formatMessage({ id: 'info.view.accessibilityOptions.mobility.cart' })}</li>
        </ul>
      </li>
    </ul>
  );

  const appLink = 'https://github.com/City-of-Turku/servicemap-ui/';
  const apiLink = 'https://github.com/City-of-Turku/smbackend/';
  const guideMapLink = 'https://opaskartta.turku.fi';

  const renderLink = (link, translationId) => (
    <div className={classes.linkContainer}>
      <Link target="_blank" href={link}>
        <Typography className={classes.link} variant="body2">
          {intl.formatMessage({ id: translationId })}
        </Typography>
      </Link>
    </div>
  );

  return (
    <div className={classes.container}>
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
      {renderLink(feedbackLink, 'info.view.feedbackLink')}
      {renderTitle('info.view.copyrightInfoTitle')}
      {renderParagraph('info.view.copyrightInfo')}
      {renderLink(appLink, 'info.view.repository.app')}
      {renderLink(apiLink, 'info.view.repository.api')}
      {renderParagraph('info.view.openStreetInfo')}
      {renderParagraph('info.view.usageInfo')}
      {renderParagraph('info.view.turkuServicesInfo')}
      {renderParagraph('info.view.registryInfo')}
    </div>
  );
};

OptionalText.propTypes = {
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  locale: PropTypes.string.isRequired,
};

export default OptionalText;

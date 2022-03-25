import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Paragraph from '../Paragraph';
import LinkBasic from '../LinkBasic';

const OptionalA11yText = ({ classes, intl, locale }) => {
  const [serviceMapTkuLink, setServiceMapTkuLink] = useState(null);
  const [serviceMapHelLink, setServiceMapHelLink] = useState(null);
  const [serviceDirectoryLink, setServiceDirectoryLink] = useState(null);
  const [feedbackLink, setFeedbackLink] = useState(null);

  const unitOptions = [
    intl.formatMessage({ id: 'info.view.a11y.page.information.units.1' }),
    intl.formatMessage({ id: 'info.view.a11y.page.information.units.2' }),
  ];

  const auditReportLink = 'https://www.hel.fi/static/liitteet-2019/Helsinki/Saavutettavuusselosteet/Palvelukartta-auditointiraportti.pdf';

  const setLocalizedLink = (setLink, linkUrlSv, linkUrlEn, linkUrlFi) => {
    if (locale === 'sv') {
      setLink(linkUrlSv);
    } else if (locale === 'en') {
      setLink(linkUrlEn);
    } else setLink(linkUrlFi);
  };

  useEffect(() => {
    setLocalizedLink(
      setServiceMapTkuLink,
      'https://servicekarta.turku.fi/',
      'https://servicemap.turku.fi/',
      'https://palvelukartta.turku.fi/',
    );
    setLocalizedLink(
      setServiceMapHelLink,
      'https://servicekarta.hel.fi/',
      'https://servicemap.hel.fi/',
      'https://palvelukartta.hel.fi/',
    );
    setLocalizedLink(
      setServiceDirectoryLink,
      'https://www.turku.fi/sv/service-directory',
      'https://www.turku.fi/en/service-directory',
      'https://www.turku.fi/palveluhakemisto',
    );
    setLocalizedLink(
      setFeedbackLink,
      'https://opaskartta.turku.fi/eFeedback/sv/Feedback/87/1048',
      'https://opaskartta.turku.fi/eFeedback/en/Feedback/87/1048',
      'https://opaskartta.turku.fi/eFeedback/fi/Feedback/87/1048',
    );
  }, [locale]);

  const renderList = input => (
    <ul>
      {input.map(item => (
        <li key={item}>
          <Typography variant="body2">{item}</Typography>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={classes.container}>
      <Paragraph isTitle translationId="info.view.a11y.page.title" />
      <Paragraph translationId="info.view.a11y.page.info.turku" />
      <LinkBasic linkUrl={serviceMapTkuLink} translationId="info.view.a11y.page.info.turku.url" />
      <Paragraph translationId="info.view.a11y.page.info.helsinki" />
      <LinkBasic linkUrl={serviceMapHelLink} translationId="info.view.a11y.page.info.helsinki.url" />
      <Paragraph isTitle translationId="info.view.a11y.page.status.title" />
      <Paragraph translationId="info.view.a11y.page.status.info" />
      <Paragraph isTitle translationId="info.view.a11y.page.nonAccessible.title" />
      <Paragraph translationId="info.view.a11y.page.nonAccessible.info" />
      <Paragraph isTitle translationId="info.view.a11y.page.correction.title" />
      <Paragraph translationId="info.view.a11y.page.correction.info" />
      <Paragraph isTitle translationId="info.view.a11y.page.information.title" />
      <Paragraph translationId="info.view.a11y.page.information.info" />
      <LinkBasic linkUrl={serviceDirectoryLink} translationId="info.view.turkuServices.link" />
      <Paragraph translationId="info.view.a11y.page.information.units" />
      {renderList(unitOptions)}
      <Paragraph isTitle translationId="info.view.a11y.page.feedback.title" />
      <Paragraph translationId="info.view.a11y.page.feedback.info" />
      <LinkBasic linkUrl={feedbackLink} translationId="info.view.a11y.page.feedback.link" />
      <Paragraph isTitle translationId="info.view.a11y.page.supervisor.title" />
      <Paragraph translationId="info.view.a11y.page.supervisor.info" />
      <Paragraph isTitle translationId="info.view.a11y.page.work.title" />
      <Paragraph isTitle translationId="info.view.a11y.page.evaluation.title" />
      <Paragraph translationId="info.view.a11y.page.evaluation.info" />
      <Paragraph translationId="info.view.a11y.page.evaluation.audit" />
      <LinkBasic linkUrl={auditReportLink} translationId="info.view.a11y.page.evaluation.audit.url" />
      <Paragraph isTitle translationId="info.view.a11y.page.services.title" />
      <Paragraph translationId="info.view.a11y.page.services.info" />
      <Paragraph isTitle translationId="info.view.a11y.page.support.title" />
      <Paragraph translationId="info.view.a11y.page.support.info" />
      {renderList(unitOptions)}
      <Paragraph isTitle translationId="info.view.a11y.page.statement.update.title" />
      <Paragraph translationId="info.view.a11y.page.statement.update.info" />
      <Paragraph translationId="info.view.a11y.page.date" />
    </div>
  );
};

OptionalA11yText.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  locale: PropTypes.string.isRequired,
};

export default OptionalA11yText;

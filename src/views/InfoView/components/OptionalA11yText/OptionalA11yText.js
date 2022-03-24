import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const OptionalA11yText = ({ classes, intl }) => {
  const unitOptions = [
    intl.formatMessage({ id: 'info.view.a11y.page.information.units.1' }),
    intl.formatMessage({ id: 'info.view.a11y.page.information.units.2' }),
  ];

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

  return (
    <div className={classes.container}>
      {renderTitle('info.view.a11y.page.title')}
      {renderParagraph('info.view.a11y.page.info.turku')}
      {renderParagraph('info.view.a11y.page.info.helsinki')}
      {renderTitle('info.view.a11y.page.status.title')}
      {renderParagraph('info.view.a11y.page.status.info')}
      {renderTitle('info.view.a11y.page.nonAccessible.title')}
      {renderParagraph('info.view.a11y.page.nonAccessible.info')}
      {renderTitle('info.view.a11y.page.correction.title')}
      {renderParagraph('info.view.a11y.page.correction.info')}
      {renderTitle('info.view.a11y.page.information.title')}
      {renderParagraph('info.view.a11y.page.information.info')}
      {renderParagraph('info.view.a11y.page.information.units')}
      {renderList(unitOptions)}
      {renderTitle('info.view.a11y.page.feedback.title')}
      {renderParagraph('info.view.a11y.page.feedback.info')}
      {renderTitle('info.view.a11y.page.supervisor.title')}
      {renderParagraph('info.view.a11y.page.supervisor.info')}
      {renderTitle('info.view.a11y.page.work.title')}
      {renderTitle('info.view.a11y.page.evaluation.title')}
      {renderParagraph('info.view.a11y.page.evaluation.info')}
      {renderParagraph('info.view.a11y.page.evaluation.audit')}
      {renderTitle('info.view.a11y.page.services.title')}
      {renderParagraph('info.view.a11y.page.services.info')}
      {renderTitle('info.view.a11y.page.support.title')}
      {renderParagraph('info.view.a11y.page.support.info')}
      {renderList(unitOptions)}
      {renderTitle('info.view.a11y.page.statement.update.title')}
      {renderParagraph('info.view.a11y.page.statement.update.info')}
      {renderParagraph('info.view.a11y.page.date')}
    </div>
  );
};

OptionalA11yText.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OptionalA11yText;

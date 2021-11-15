import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import isClient from '../../utils';

const DescriptionExtraText = ({
  extra, html, classes, title, titleComponent, intl,
}) => {
  // Hide linebreak html elements from screen readers
  const hideBRFromSR = text => text.replaceAll('<br>', '<br aria-hidden="true" />');

  if (extra && isClient()) {
    return (
      <div className={classes.left}>
        <Typography
          className={classes.subtitle}
          component={titleComponent}
          variant="subtitle1"
        >
          {title}
        </Typography>
        <Divider className={classes.divider} aria-hidden="true" />
        { !html ? (
          <>
            {extra.charger_type && (
            <Typography className={classes.paragraph} variant="body2">
              <strong>
                {intl.formatMessage({
                  id: 'mobilityPlatform.content.cgsType',
                })}
                :
              </strong>
              {' '}
              {extra.charger_type}
            </Typography>
            )}
            {extra.count && (
              <Typography className={classes.paragraph} variant="body2">
                <strong>
                  {intl.formatMessage({
                    id: 'mobilityPlatform.content.count',
                  })}
                  :
                </strong>
                {' '}
                {extra.count}
                {' '}
                kpl
              </Typography>
            )}
            {extra.power && (
              <Typography className={classes.paragraph} variant="body2">
                <strong>
                  {intl.formatMessage({
                    id: 'mobilityPlatform.content.power',
                  })}
                  :
                </strong>
                {' '}
                {extra.power}
                {' '}
                kW
              </Typography>
            )}
            {extra.lng_cng && (
              <Typography className={classes.paragraph} variant="body2">
                <strong>
                  {intl.formatMessage({
                    id: 'mobilityPlatform.content.gfsType',
                  })}
                  :
                </strong>
                {' '}
                {extra.lng_cng}
              </Typography>
            )}
            <Typography className={classes.paragraph} variant="body2">
              <strong>
                {intl.formatMessage({
                  id: 'mobilityPlatform.content.operator',
                })}
                :
              </strong>
              {' '}
              {extra.operator}
            </Typography>
          </>
        ) : (
          <Typography dangerouslySetInnerHTML={{ __html: hideBRFromSR(extra) }} className={classes.paragraph} variant="body2" />
        )}
      </div>
    );
  } return null;
};

DescriptionExtraText.propTypes = {
  extra: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.node.isRequired,
  html: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  titleComponent: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

DescriptionExtraText.defaultProps = {
  html: false,
};


export default DescriptionExtraText;

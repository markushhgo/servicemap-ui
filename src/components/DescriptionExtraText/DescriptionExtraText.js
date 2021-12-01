import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import isClient from '../../utils';

const DescriptionExtraText = ({
  extra, chargers, html, classes, title, titleComponent, intl,
}) => {
  const [isGasFillingStation, setIsGasFillingStation] = useState(false);
  // Hide linebreak html elements from screen readers
  const hideBRFromSR = text => text.replaceAll('<br>', '<br aria-hidden="true" />');

  useEffect(() => {
    if (chargers.length === 0) {
      setIsGasFillingStation(true);
    }
  }, [chargers]);

  const chargerStationInfo = (
    <>
      <Typography variant="subtitle1" className={classes.paragraph}>
        {intl.formatMessage({
          id: 'mobilityPlatform.content.chargersTitle',
        })}
        :
      </Typography>
      {chargers.map((charger, index) => (
        <div key={index} className={classes.contentInner}>
          <Typography className={classes.paragraph} variant="body2">
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.cgsType',
              })}
              :
            </strong>
            {' '}
            {charger.type}
          </Typography>
          <Typography className={classes.paragraph} variant="body2">
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.count',
              })}
              :
            </strong>
            {' '}
            {charger.count}
          </Typography>
          <Typography className={classes.paragraph} variant="body2">
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.power',
              })}
              :
            </strong>
            {' '}
            {charger.power}
            {' '}
            kW
          </Typography>
          <Typography className={classes.paragraph} variant="body2">
            <strong>
              {intl.formatMessage({
                id: 'mobilityPlatform.content.operator',
              })}
              :
            </strong>
            {' '}
            {charger.operator}
          </Typography>
        </div>
      ))}
    </>
  );

  const gasFillingInfo = (
    <>
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
  );

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
            {!isGasFillingStation ? chargerStationInfo : gasFillingInfo}
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
  chargers: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.node.isRequired,
  html: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  titleComponent: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};

DescriptionExtraText.defaultProps = {
  html: false,
  chargers: [],
};


export default DescriptionExtraText;

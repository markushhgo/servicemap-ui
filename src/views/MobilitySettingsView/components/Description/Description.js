import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';

const Description = ({
  classes, intl, route, currentLocale, showDescriptionText, setShowDescriptionText,
}) => {
  const selectRouteDescription = (descriptionSv, descriptionEn, descriptionFi) => {
    if (currentLocale === 'sv' && descriptionSv) {
      return descriptionSv;
    }
    if (currentLocale === 'en' && descriptionEn) {
      return descriptionEn;
    }
    return descriptionFi;
  };

  const descriptionToggle = () => {
    setShowDescriptionText(current => !current);
  };

  return (
    <div className={classes.descriptionContainer}>
      <div className={classes.subtitle}>
        <Button className={classes.buttonWhite} onClick={() => descriptionToggle()}>
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
          <Typography component="p" variant="body2" className={classes.margin}>
            {intl.formatMessage({
              id: 'mobilityPlatform.menu.routes.name',
            })}
            :
            {' '}
            {selectRouteDescription(route.name_sv, route.name_en, route.name)}
          </Typography>
          <Typography component="p" variant="body2">
            {selectRouteDescription(route.description_sv, route.description_en, route.description)}
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

Description.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
  currentLocale: PropTypes.string,
  showDescriptionText: PropTypes.bool,
  setShowDescriptionText: PropTypes.func.isRequired,
};

Description.defaultProps = {
  route: null,
  currentLocale: 'fi',
  showDescriptionText: true,
};

export default Description;

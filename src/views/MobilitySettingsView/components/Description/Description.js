import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Description = ({
  classes, route, currentLocale,
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

  return (
    <div className={classes.descriptionContainer}>
      <div className={classes.paragraph}>
        <Typography component="p" variant="body2">
          {selectRouteDescription(route.description_sv, route.description_en, route.description)}
        </Typography>
      </div>
    </div>
  );
};

Description.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
  currentLocale: PropTypes.string,
};

Description.defaultProps = {
  route: null,
  currentLocale: 'fi',
};

export default Description;

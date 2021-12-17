import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Typography, Link } from '@material-ui/core';
import unitSectionFilter from '../../utils/unitSectionFilter';
import DescriptionText from '../../../../components/DescriptionText';
import DescriptionExtraText from '../../../../components/DescriptionExtraText';
import useLocaleText from '../../../../utils/useLocaleText';

const Description = ({ unit, classes }) => {
  const getLocaleText = useLocaleText();

  // Custom state for this, because bicycle stand description value evaluates to false and extra fields won't render
  const [isBicycleStand, setIsBicycleStand] = useState(false);

  const additionalInfo = [
    ...unitSectionFilter(unit.connections, 'OTHER_INFO'),
    ...unitSectionFilter(unit.connections, 'TOPICAL'),
  ];

  useEffect(() => {
    if (unit.services[0].id === 40000) {
      setIsBicycleStand(true);
    }
  }, [unit]);

  if (unit.description || additionalInfo.length || isBicycleStand) {
    return (
      <div>
        {/* Description */}
        {unit.description && (
          <DescriptionText
            description={getLocaleText(unit.description)}
            title={<FormattedMessage id="unit.description" />}
            titleComponent="h4"
            extraField={unit.extra}
          />
        )}
        {/* Extra field */}
        {unit.extra && (
          <DescriptionExtraText
            extra={unit.extra}
            chargers={unit.extra.chargers}
            serviceId={unit.services[0].id}
            title={<FormattedMessage id="unit.description" />}
            titleComponent="h4"
          />
        )}
        {/* Other info texts + links */}
        {additionalInfo.map((item) => {
          if (item.value.www) {
            return (
              <Typography
                key={item.id}
                className={`${classes.paragraph} ${classes.left}`}
                variant="body2"
              >
                <Link className={classes.link} href={getLocaleText(item.value.www)} target="_blank">
                  {getLocaleText(item.value.name)}
                  {' '}
                  <FormattedMessage id="unit.opens.new.tab" />
                </Link>

              </Typography>
            );
          }
          return (
            <Typography
              key={item.id}
              className={`${classes.paragraph} ${classes.left}`}
              variant="body2"
            >
              {getLocaleText(item.value.name)}
            </Typography>
          );
        })}
      </div>
    );
  }
  return (
    null
  );
};

Description.propTypes = {
  unit: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Description;

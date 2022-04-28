import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const PaymentZoneContent = ({ classes, intl, paymentZone }) => {
  const renderText = (msgId, objValue, isTitle) => (
    <div className={isTitle ? classes.subtitle : classes.text}>
      <Typography variant={isTitle ? 'subtitle1' : 'body2'}>
        {intl.formatMessage({
          id: msgId,
        })}
        :
        {' '}
        {objValue}
      </Typography>
    </div>
  );

  return (
    <div className={classes.popupInner}>
      {renderText('mobilityPlatform.content.paymentZones.zone', paymentZone.extra.maksuvyohyke, true)}
      {renderText('mobilityPlatform.content.paymentZones.price.weekDays', paymentZone.extra.maksullisuus_arki, false)}
      {renderText('mobilityPlatform.content.paymentZones.price.saturday', paymentZone.extra.maksullisuus_lauantai, false)}
      {renderText('mobilityPlatform.content.paymentZones.price.sunday', paymentZone.extra.maksullisuus_sunnuntai, false)}
      {renderText('mobilityPlatform.content.paymentZones.price', paymentZone.extra.maksuvyohykehinta, false)}
    </div>
  );
};

PaymentZoneContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  paymentZone: PropTypes.objectOf(PropTypes.any),
};

PaymentZoneContent.defaultProps = {
  paymentZone: null,
};

export default PaymentZoneContent;

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

const ChargerStationContent = ({ classes, intl, station }) => {
  const locale = useSelector(state => state.user.locale);

  const titleTypo = (messageId, props = {}) => (
    <div {...props}>
      <Typography variant="subtitle2">
        {intl.formatMessage({
          id: messageId,
        })}
        :
      </Typography>
    </div>
  );

  const singleValTypo = (messageId, value, props = {}) => (
    <div {...props}>
      <Typography>
        <strong>
          {intl.formatMessage({
            id: messageId,
          })}
          :
        </strong>
        {' '}
        {value}
      </Typography>
    </div>
  );

  const renderName = (nameFi, nameEn, nameSv) => {
    switch (locale) {
      case 'en':
        return nameEn;
      case 'sv':
        return nameSv;
      default:
        return nameFi;
    }
  };

  const renderAddress = () => {
    switch (locale) {
      case 'en':
        return singleValTypo('mobilityPlatform.content.address', station.address_en, { className: classes.margin });
      case 'sv':
        return singleValTypo('mobilityPlatform.content.address', station.address_sv, { className: classes.margin });
      default:
        return singleValTypo('mobilityPlatform.content.address', station.address_fi, { className: classes.margin });
    }
  };

  const renderAdministrator = (item) => {
    switch (locale) {
      case 'en':
        return singleValTypo('mobilityPlatform.chargerStations.content.admin', item.en, { className: classes.margin });
      case 'sv':
        return singleValTypo('mobilityPlatform.chargerStations.content.admin', item.sv, { className: classes.margin });
      default:
        return singleValTypo('mobilityPlatform.chargerStations.content.admin', item.fi, { className: classes.margin });
    }
  };

  const gasFillingInfo = (
    <>
      {titleTypo('mobilityPlatform.content.gfsTitle')}
      {singleValTypo('mobilityPlatform.content.address', station.address)}
      {singleValTypo('mobilityPlatform.content.gfsType', station.extra.lng_cng)}
      {singleValTypo('mobilityPlatform.content.operator', station.extra.operator)}
    </>
  );

  const chargerStationInfo = (
    <>
      {renderAddress()}
      {renderAdministrator(station.extra.administrator)}
      {titleTypo('mobilityPlatform.content.chargersTitle', { className: classes.margin })}
      {station.extra.chargers && station.extra.chargers.length > 0
        ? station.extra.chargers.map(charger => (
          <div key={charger.plug} className={classes.contentInner}>
            {singleValTypo('mobilityPlatform.content.cgsType', charger.plug)}
            {singleValTypo('mobilityPlatform.content.count', charger.number)}
            <Typography>
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
          </div>
        ))
        : null}
    </>
  );

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography variant="subtitle1">
          {station.content_type.type_name === 'GFS'
            ? station.name
            : renderName(station.name, station.name_en, station.name_sv)}
        </Typography>
      </div>
      <div className={classes.textContainer}>
        {station.content_type.type_name === 'GFS' ? gasFillingInfo : chargerStationInfo}
      </div>
    </div>
  );
};

ChargerStationContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  station: PropTypes.objectOf(PropTypes.any),
};

ChargerStationContent.defaultProps = {
  station: {},
};

export default ChargerStationContent;

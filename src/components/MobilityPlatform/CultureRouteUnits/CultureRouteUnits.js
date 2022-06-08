import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useMap } from 'react-leaflet';
import { Typography, ButtonBase } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import routeUnitIcon from 'servicemap-ui-turku/assets/icons/icons-icon_culture_route.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { selectRouteName } from '../utils/utils';

const CultureRouteUnits = ({ classes, cultureRouteUnits }) => {
  const { cultureRouteId } = useContext(MobilityPlatformContext);

  const intl = useIntl();

  const locale = useSelector(state => state.user.locale);
  const map = useMap();

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: routeUnitIcon,
    iconSize: [45, 45],
  });

  const closePopup = () => {
    if (map) {
      map.closePopup();
    }
  };

  const activeCultureRouteUnits = cultureRouteUnits.filter(item => item.mobile_unit_group.id === cultureRouteId);

  const renderDescription = (descriptionFi, descriptionEn, descriptionSv, nameFi, nameEn, nameSv) => {
    let desc = descriptionFi;
    let name = nameFi;
    if (locale === 'sv') {
      desc = descriptionSv;
      name = nameSv;
    } else if (locale === 'en') {
      desc = descriptionEn;
      name = nameEn;
    }
    if (!desc) {
      return intl.formatMessage({ id: 'mobilityPlatform.content.description.notAvailable' });
    }
    return desc.replace(name, '');
  };

  return (
    <>
      <div>
        {activeCultureRouteUnits
          && activeCultureRouteUnits.length > 0
          && activeCultureRouteUnits.map(item => (
            <Marker key={item.id} icon={customIcon} position={[item.geometry_coords.lat, item.geometry_coords.lon]}>
              <Popup closeButton={false} maxHeight={400} className="culture-route-unit-popup">
                <div className={classes.popupInner}>
                  <div className={classes.header}>
                    <Typography variant="subtitle1">
                      {selectRouteName(locale, item.name, item.name_en, item.name_sv)}
                    </Typography>
                    <ButtonBase onClick={() => closePopup()} className={classes.popupCloseButton}>
                      <Close className={classes.infoIcon} />
                    </ButtonBase>
                  </div>
                  <div className={classes.content}>
                    <Typography variant="body2">
                      {renderDescription(
                        item.description,
                        item.description_en,
                        item.description_sv,
                        item.name,
                        item.name_en,
                        item.name_sv,
                      )}
                    </Typography>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </div>
    </>
  );
};

CultureRouteUnits.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  cultureRouteUnits: PropTypes.arrayOf(PropTypes.any),
};

CultureRouteUnits.defaultProps = {
  cultureRouteUnits: [],
};

export default CultureRouteUnits;

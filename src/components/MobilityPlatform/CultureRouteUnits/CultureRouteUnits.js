import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchCultureRoutesData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import { getCurrentLocale, selectRouteName } from '../utils/utils';
import routeUnitIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_culture_route.svg';

const CultureRouteUnits = ({ classes, intl, cultureRoute }) => {
  const [cultureRouteUnits, setCultureRouteUnits] = useState(null);
  const [activeCultureRouteUnits, setActiveCultureRouteUnits] = useState(null);
  const [currentLocale, setCurrentLocale] = useState('fi');

  const { openMobilityPlatform, cultureRouteId } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: routeUnitIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    getCurrentLocale(intl.locale, setCurrentLocale);
  }, [intl.locale]);

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchCultureRoutesData(apiUrl, 'CRU', 150, setCultureRouteUnits);
    }
  }, [openMobilityPlatform, setCultureRouteUnits]);

  useEffect(() => {
    if (cultureRouteUnits && cultureRoute) {
      const routeUnits = cultureRouteUnits.reduce((acc, item) => {
        if (item.mobile_unit_group.id === cultureRouteId) {
          acc.push(item);
        }
        return acc;
      }, []);
      setActiveCultureRouteUnits(routeUnits);
    }
  }, [cultureRouteUnits, cultureRouteId, cultureRoute]);

  useEffect(() => {
    if (!cultureRoute) {
      setActiveCultureRouteUnits(null);
    }
  }, [cultureRoute]);

  return (
    <>
      <div>
        {activeCultureRouteUnits
          && activeCultureRouteUnits.map(item => (
            <Marker key={item.id} icon={customIcon} position={[item.geometry_coords.lat, item.geometry_coords.lon]}>
              <Popup>
                <div className={classes.popupInner}>
                  <div className={classes.subtitle}>
                    <Typography variant="body2">
                      {selectRouteName(currentLocale, item.name, item.name_en, item.name_sv)}
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
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  cultureRoute: PropTypes.objectOf(PropTypes.any),
};

CultureRouteUnits.defaultProps = {
  cultureRoute: null,
};

export default CultureRouteUnits;

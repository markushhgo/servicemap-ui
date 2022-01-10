import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchCultureRoutesUnits } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import routeUnitIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_culture_route.svg';

const CultureRouteUnits = ({ classes }) => {
  const [cultureRouteUnits, setCultureRouteUnits] = useState(null);
  const [activeCultureRouteUnits, setActiveCultureRouteUnits] = useState(null);

  const { cultureRouteId } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: routeUnitIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    fetchCultureRoutesUnits(apiUrl, setCultureRouteUnits);
  }, [setCultureRouteUnits]);

  useEffect(() => {
    if (cultureRouteUnits !== null) {
      const routeUnits = [];
      cultureRouteUnits.forEach((item) => {
        if (item.mobile_unit_group.id === cultureRouteId) {
          routeUnits.push(item);
        }
      });
      setActiveCultureRouteUnits(routeUnits);
    }
  }, [cultureRouteUnits, cultureRouteId]);

  return (
    <>
      <div>
        {activeCultureRouteUnits
              && activeCultureRouteUnits.map(item => (
                <Marker key={item.id} icon={customIcon} position={[item.geometry_coords.lat, item.geometry_coords.lon]}>
                  <Popup>
                    <div className={classes.popupInner}>
                      <div className={classes.subtitle}>
                        <Typography variant="body2">{item.name}</Typography>
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
};

export default CultureRouteUnits;

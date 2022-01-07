import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchCultureRoutesGeometry } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import CultureRouteUnits from '../CultureRouteUnits';

const CultureRoutes = () => {
  const [cultureRoutes, setCultureRoutes] = useState(null);
  const [activeCultureRoute, setActiveCultureRoute] = useState(null);

  const { showCultureRoutes, cultureRouteId } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Polyline } = global.rL;

  const blackOptions = { color: '#000000' };
  // const blueOptions = { color: 'rgba(7, 44, 115, 255)' };

  useEffect(() => {
    fetchCultureRoutesGeometry(apiUrl, setCultureRoutes);
  }, [setCultureRoutes]);

  useEffect(() => {
    if (cultureRoutes !== null) {
      cultureRoutes.forEach((item) => {
        if (item.mobile_unit_group.id === cultureRouteId) {
          setActiveCultureRoute(item);
        }
      });
    }
  }, [cultureRoutes, cultureRouteId]);

  useEffect(() => {
    console.log(cultureRouteId);
  }, [cultureRouteId]);

  return (
    <>
      {showCultureRoutes
        && (
        <>
          <div>
            {activeCultureRoute && (
            <Polyline
              key={activeCultureRoute.id}
              pathOptions={blackOptions}
              positions={activeCultureRoute.geometry_coords}
            />
            )}
          </div>
          <div>
            <CultureRouteUnits />
          </div>
        </>
        )}
    </>
  );
};

export default CultureRoutes;

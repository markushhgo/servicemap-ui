import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchCultureRoutesData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import CultureRouteUnits from '../CultureRouteUnits';

const CultureRoutes = () => {
  const [cultureRoutes, setCultureRoutes] = useState(null);
  const [activeCultureRoute, setActiveCultureRoute] = useState(null);

  const { openMobilityPlatform, showCultureRoutes, cultureRouteId } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Polyline } = global.rL;

  const blackOptions = { color: '#000000' };
  const grayOptions = { color: '#e8e8e8', dashArray: '5, 10' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchCultureRoutesData(apiUrl, 'CRG', 20, setCultureRoutes);
    }
  }, [openMobilityPlatform, setCultureRoutes]);

  useEffect(() => {
    if (cultureRoutes) {
      cultureRoutes.forEach((item) => {
        if (item.mobile_unit_group.id === cultureRouteId) {
          setActiveCultureRoute(item);
        }
      });
    }
  }, [cultureRoutes, cultureRouteId]);

  return (
    <>
      {showCultureRoutes && (
        <>
          <div>
            {activeCultureRoute && (
              <>
                <Polyline
                  pathOptions={blackOptions}
                  weight={6}
                  positions={activeCultureRoute.geometry_coords}
                />
                <Polyline
                  pathOptions={grayOptions}
                  weight={3}
                  positions={activeCultureRoute.geometry_coords}
                />
              </>
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

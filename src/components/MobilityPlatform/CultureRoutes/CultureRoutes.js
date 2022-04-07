import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchCultureRoutesData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import CultureRouteUnits from '../CultureRouteUnits';

const CultureRoutes = () => {
  const [cultureRoutesGeometry, setCultureRoutesGeometry] = useState([]);
  const [activeCultureRoute, setActiveCultureRoute] = useState(null);

  const { openMobilityPlatform, showCultureRoutes, cultureRouteId } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Polyline } = global.rL;

  const blackOptions = { color: '#000000' };
  const grayOptions = { color: '#e8e8e8', dashArray: '5, 10' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchCultureRoutesData(apiUrl, 'CRG', 20, setCultureRoutesGeometry);
    }
  }, [openMobilityPlatform, setCultureRoutesGeometry]);

  useEffect(() => {
    if (cultureRoutesGeometry && cultureRoutesGeometry.length > 0) {
      setActiveCultureRoute(cultureRoutesGeometry.find(item => item.mobile_unit_group.id === cultureRouteId));
    }
  }, [cultureRoutesGeometry, cultureRouteId]);

  useEffect(() => {
    if (!showCultureRoutes) {
      setActiveCultureRoute(null);
    }
  }, [showCultureRoutes]);

  const swapCoords = (inputData) => {
    if (inputData && inputData.length > 0) {
      return inputData.map(item => [item[1], item[0]]);
    }
    return inputData;
  };

  return (
    <>
      {showCultureRoutes && (
        <>
          {activeCultureRoute && (
            <>
              <Polyline pathOptions={blackOptions} weight={6} positions={swapCoords(activeCultureRoute.geometry_coords)} />
              <Polyline pathOptions={grayOptions} weight={3} positions={swapCoords(activeCultureRoute.geometry_coords)} />
            </>
          )}
          <>
            <CultureRouteUnits cultureRoute={activeCultureRoute} />
          </>
        </>
      )}
    </>
  );
};

export default CultureRoutes;

import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchCultureRoutesData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import CultureRouteUnits from '../CultureRouteUnits';

const CultureRoutes = () => {
  const [cultureRoutesGeometry, setCultureRoutesGeometry] = useState([]);

  const { openMobilityPlatform, showCultureRoutes, cultureRouteId } = useContext(MobilityPlatformContext);

  const { Polyline } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };
  const whiteOptions = { color: '#ffffff', dashArray: '1, 8' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchCultureRoutesData('CRG', 20, setCultureRoutesGeometry);
    }
  }, [openMobilityPlatform, setCultureRoutesGeometry]);

  const activeCultureRoute = cultureRoutesGeometry.find(item => item.mobile_unit_group.id === cultureRouteId);

  const swapCoords = (inputData) => {
    if (inputData && inputData.length > 0) {
      return inputData.map(item => [item[1], item[0]]);
    }
    return inputData;
  };

  const map = useMap();

  useEffect(() => {
    if (showCultureRoutes && activeCultureRoute) {
      const bounds = swapCoords(activeCultureRoute.geometry_coords);
      map.fitBounds(bounds);
    }
  }, [showCultureRoutes, activeCultureRoute]);

  return (
    <>
      {showCultureRoutes ? (
        <>
          {activeCultureRoute && (
            <>
              <Polyline pathOptions={blueOptions} weight={8} positions={swapCoords(activeCultureRoute.geometry_coords)} />
              <Polyline pathOptions={whiteOptions} weight={4} positions={swapCoords(activeCultureRoute.geometry_coords)} />
            </>
          )}
          <>
            <CultureRouteUnits />
          </>
        </>
      ) : null}
    </>
  );
};

export default CultureRoutes;

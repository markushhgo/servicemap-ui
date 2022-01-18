import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchBicycleRoutesData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const BicycleRoutes = () => {
  const [mainBicycleRoutes, setMainBicycleRoutes] = useState(null);
  const [qualityBicycleRoutes, setQualityBicycleRoutes] = useState(null);

  const { openMobilityPlatform, showMainBicycleRoutes, showQualityBicycleRoutes } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.BICYCLE_NETWORK_API;

  const { Polyline } = global.rL;

  const blackOptions = { color: '#000000' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchBicycleRoutesData(apiUrl, 'main_network', setMainBicycleRoutes);
    }
  }, [openMobilityPlatform, setMainBicycleRoutes]);

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchBicycleRoutesData(apiUrl, 'quality_lanes', setQualityBicycleRoutes);
    }
  }, [openMobilityPlatform, setQualityBicycleRoutes]);

  return (
    <>
      {showMainBicycleRoutes ? (
        <>
          <div>
            {mainBicycleRoutes
              && mainBicycleRoutes.map(item => (
                <Polyline key={item.id} pathOptions={blackOptions} positions={item.geometry_coords} />
              ))}
          </div>
        </>
      ) : null}
      {showQualityBicycleRoutes ? (
        <>
          <div>
            {qualityBicycleRoutes
              && qualityBicycleRoutes.map(item => <Polyline key={item.id} positions={item.geometry_coords} />)}
          </div>
        </>
      ) : null}
    </>
  );
};

export default BicycleRoutes;

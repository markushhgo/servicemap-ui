import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchBicycleRoutesGeometry } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const BicycleRoutes = () => {
  const [bicycleRoutes, setBicycleRoutes] = useState([]);

  const { openMobilityPlatform, showBicycleRoutes, bicycleRouteName } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Polyline } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };
  const whiteOptions = { color: '#ffff', dashArray: '5, 15', lineCap: 'square' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchBicycleRoutesGeometry(apiUrl, setBicycleRoutes);
    }
  }, [openMobilityPlatform, setBicycleRoutes]);


  const activeBicycleRoute = bicycleRoutes.filter(item => item.bicycle_network_name === bicycleRouteName);

  return (
    <>
      {showBicycleRoutes && (
        <div>
          {activeBicycleRoute
            && activeBicycleRoute.map(item => (
              <div key={item.id}>
                <Polyline key={item.geometry} weight={8} pathOptions={blueOptions} positions={item.geometry_coords} />
                <Polyline
                  key={item.geometry_coords}
                  weight={4}
                  pathOptions={whiteOptions}
                  positions={item.geometry_coords}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default BicycleRoutes;

import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchBicycleRoutesGeometry } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const BicycleRoutes = () => {
  const [bicycleRoutes, setBicycleRoutes] = useState(null);
  const [activeBicycleRoute, setActiveBicycleRoute] = useState(null);

  const { showBicycleRoutes, bicycleRouteName } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.BICYCLE_NETWORK_API;

  const { Polyline } = global.rL;

  const blackOptions = { color: '#000000' };

  useEffect(() => {
    fetchBicycleRoutesGeometry(apiUrl, setBicycleRoutes);
  }, [setBicycleRoutes]);

  useEffect(() => {
    const routeData = [];
    if (bicycleRoutes !== null) {
      bicycleRoutes.forEach((item) => {
        if (item.bicycle_network_name === bicycleRouteName) {
          routeData.push(item);
        }
        setActiveBicycleRoute(routeData);
      });
    }
  }, [bicycleRoutes, bicycleRouteName]);

  return (
    <>
      {showBicycleRoutes && (
        <>
          <div>
            {activeBicycleRoute
              && activeBicycleRoute.map(item => (
                <Polyline key={item.id} weight={5} pathOptions={blackOptions} positions={item.geometry_coords} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default BicycleRoutes;

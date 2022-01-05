import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchBicycleRoutesData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import jsonFile from '../../../../node_modules/servicemap-ui-turku/assets/files/bicycle-travel-routes.json';

const BicycleRoutes = () => {
  const [mainBicycleRoutes, setMainBicycleRoutes] = useState(null);
  const [qualityBicycleRoutes, setQualityBicycleRoutes] = useState(null);
  const [travelBicycleRoutes, setTravelBicycleRoutes] = useState(null);

  const { showMainBicycleRoutes, showQualityBicycleRoutes, activeRoute } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.BICYCLE_NETWORK_API;

  const { Polyline } = global.rL;

  const blackOptions = { color: '#000000' };
  // const whiteOptions = { color: '#ffffff', dashArray: '5, 10' };
  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };

  const swapCoords = (inputData) => {
    const swapped = [];
    inputData.forEach((item) => {
      const swappedItem = item.splice(0).reverse();
      swapped.push(swappedItem);
    });
    return swapped;
  };

  useEffect(() => {
    fetchBicycleRoutesData(apiUrl, 'main_network', setMainBicycleRoutes);
  }, [setMainBicycleRoutes]);

  useEffect(() => {
    fetchBicycleRoutesData(apiUrl, 'quality_lanes', setQualityBicycleRoutes);
  }, [setQualityBicycleRoutes]);

  useEffect(() => {
    setTravelBicycleRoutes(jsonFile.features);
  }, [setTravelBicycleRoutes]);

  const routeElement = index => (
    <Polyline
      key={travelBicycleRoutes[index].id}
      pathOptions={blueOptions}
      weight={6}
      positions={swapCoords(travelBicycleRoutes[index].geometry.coordinates)}
    />
  );

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
      <div>{activeRoute ? routeElement(activeRoute) : null}</div>
      {/* {showTravelBicycleRoutes ? (
        <>
          <div>
            {travelBicycleRoutes
              && travelBicycleRoutes.map(item => (
                <>
                  <Polyline
                    key={item.id}
                    pathOptions={blueOptions}
                    weight={6}
                    positions={swapCoords(item.geometry.coordinates)}
                  />
                </>
              ))}
          </div>
        </>
      ) : null} */}
    </>
  );
};

export default BicycleRoutes;

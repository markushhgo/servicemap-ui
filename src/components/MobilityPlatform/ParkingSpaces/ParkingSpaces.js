import React, { useEffect, useState, useContext } from 'react';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState(null);

  const { openMobilityPlatform, showParkingSpaces } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Polygon } = global.rL;

  const pathOptions = { color: 'rgba(98,210,240,255)' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'TPH', setParkingSpaces);
    }
  }, [openMobilityPlatform, setParkingSpaces]);

  const swapCoords = (inputData) => {
    if (inputData.length > 0) {
      return inputData.map(item => item.map(v => v.map(j => [j[1], j[0]])));
    }
  };

  return (
    <>
      {showParkingSpaces ? (
        <div>
          <div>
            {parkingSpaces
              && parkingSpaces.features.map(item => (
                <Polygon key={item.id} pathOptions={pathOptions} positions={swapCoords(item.geometry.coordinates)} />
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ParkingSpaces;

import React, { useEffect, useState, useContext } from 'react';
import { fetchParkingData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState(null);

  const { openMobilityPlatform, showParkingSpaces } = useContext(MobilityPlatformContext);

  const { Polygon } = global.rL;

  const pathOptions = { color: '#000000' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchParkingData(setParkingSpaces);
    }
  }, [openMobilityPlatform, setParkingSpaces]);

  const swapCoords = (inputData) => {
    const swappedCoords = [];
    const swappedInner = [];
    if (inputData) {
      inputData.forEach((item) => {
        item.forEach((item2) => {
          item2.forEach((item3) => {
            const swapped = item3.splice(0).reverse();
            swappedInner.push(swapped);
          });
          swappedCoords.push([swappedInner]);
        });
      });
      console.log(swappedCoords);
      return swappedCoords;
    }
  };

  return (
    <>
      {showParkingSpaces ? (
        <div>
          <div>
            {parkingSpaces
              && parkingSpaces.map(item => (
                <Polygon key={item.id} pathOptions={pathOptions} positions={swapCoords(item.geometry.coordinates)} />
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ParkingSpaces;

import React, { useEffect, useState, useContext } from 'react';
import { fetchIotData, fetchParkingStatistics } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import ParkingSpacesContent from './components/ParkingSpacesContent';

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState(null);
  const [parkingStatistics, setParkingStatistics] = useState(null);

  const { openMobilityPlatform, showParkingSpaces } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Polygon, Popup } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'TPH', setParkingSpaces);
    }
  }, [openMobilityPlatform, setParkingSpaces]);

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchParkingStatistics(setParkingStatistics);
    }
  }, [openMobilityPlatform, setParkingSpaces]);

  const swapCoords = (inputData) => {
    if (inputData.length > 0) {
      return inputData.map(item => item.map(v => v.map(j => [j[1], j[0]])));
    } return inputData;
  };

  return (
    <>
      {showParkingSpaces ? (
        <>
          <div>
            {parkingSpaces
              && parkingSpaces.features.map(item => (
                <Polygon key={item.id} pathOptions={blueOptions} positions={swapCoords(item.geometry.coordinates)}>
                  <Popup>
                    <ParkingSpacesContent parkingSpace={item} parkingStatistics={parkingStatistics} />
                  </Popup>
                </Polygon>
              ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ParkingSpaces;

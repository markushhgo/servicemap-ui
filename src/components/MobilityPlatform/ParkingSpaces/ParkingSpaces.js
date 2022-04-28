import React, { useEffect, useState, useContext } from 'react';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import ParkingSpacesContent from './components/ParkingSpacesContent';

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState(null);
  const [parkingStatistics, setParkingStatistics] = useState([]);

  const { openMobilityPlatform, showParkingSpaces } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Polygon, Popup } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'TPH', setParkingSpaces);
      fetchIotData(apiUrl, 'PAS', setParkingStatistics);
    }
  }, [openMobilityPlatform, setParkingSpaces, setParkingStatistics]);

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
                    <ParkingSpacesContent parkingSpace={item} parkingStatistics={parkingStatistics.results} />
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

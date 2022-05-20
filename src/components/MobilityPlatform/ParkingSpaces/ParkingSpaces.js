import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import ParkingSpacesContent from './components/ParkingSpacesContent';

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState({});
  const [parkingStatistics, setParkingStatistics] = useState([]);

  const { openMobilityPlatform, showParkingSpaces } = useContext(MobilityPlatformContext);

  const { Polygon, Popup } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };
  const redOptions = { color: 'rgba(240, 22, 22, 255)' };

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData('TPH', setParkingSpaces);
      fetchIotData('PAS', setParkingStatistics);
    }
  }, [openMobilityPlatform, setParkingSpaces, setParkingStatistics]);

  const swapCoords = (inputData) => {
    if (inputData.length > 0) {
      return inputData.map(item => item.map(v => v.map(j => [j[1], j[0]])));
    }
    return inputData;
  };

  const map = useMap();

  useEffect(() => {
    if (showParkingSpaces && parkingSpaces && Object.entries(parkingSpaces).length > 0) {
      const bounds = [];
      parkingSpaces.features.forEach((item) => {
        bounds.push(swapCoords(item.geometry.coordinates));
      });
      map.fitBounds(bounds);
    }
  }, [showParkingSpaces]);

  const renderColor = (itemId, capacity) => {
    const stats = parkingStatistics.results.find(item => item.id === itemId);
    const almostFull = capacity * 0.85;
    const parkingCount = stats.current_parking_count;
    if (parkingCount >= almostFull) {
      return redOptions;
    } return blueOptions;
  };

  return (
    <>
      {showParkingSpaces ? (
        <>
          <div>
            {parkingSpaces
              && Object.entries(parkingSpaces).length > 0
              && parkingSpaces.features.map(item => (
                <Polygon
                  key={item.id}
                  pathOptions={renderColor(item.id, item.properties.capacity_estimate)}
                  positions={swapCoords(item.geometry.coordinates)}
                >
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

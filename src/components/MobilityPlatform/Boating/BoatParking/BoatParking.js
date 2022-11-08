import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../../context/MobilityPlatformContext';
import { fetchMobilityMapPolygonData } from '../../mobilityPlatformRequests/mobilityPlatformRequests';

/**
 * Displays boat parking areas on the map in polygon format.
 */

const BoatParking = () => {
  const [boatParkingData, setBoatParkingData] = useState([]);

  const { openMobilityPlatform, showBoatParking } = useContext(MobilityPlatformContext);

  const mapType = useSelector(state => state.settings.mapType);

  const { Polygon } = global.rL;

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapPolygonData('BOK', 50, setBoatParkingData);
    }
  }, [openMobilityPlatform, setBoatParkingData]);

  const useContrast = mapType === 'accessible_map';

  const blueOptions = { color: 'rgba(7, 44, 115, 255)', weight: 5 };

  const whiteOptions = {
    color: 'rgba(255, 255, 255, 255)', fillOpacity: 0.3, weight: 5, dashArray: '10',
  };
  const pathOptions = useContrast ? whiteOptions : blueOptions;

  const map = useMap();

  useEffect(() => {
    if (showBoatParking && boatParkingData && boatParkingData.length > 0) {
      const bounds = [];
      boatParkingData.forEach((item) => {
        bounds.push(item.geometry_coords);
      });
      map.fitBounds(bounds);
    }
  }, [showBoatParking, boatParkingData, map]);

  return (
    <>
      {showBoatParking
        && boatParkingData
        && boatParkingData.length > 0
        && boatParkingData.map(item => (
          <Polygon
            key={item.id}
            pathOptions={pathOptions}
            positions={item.geometry_coords}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: useContrast ? '0.6' : '0.2' });
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: useContrast ? '0.3' : '0.2' });
              },
            }}
          />
        ))}
    </>
  );
};

export default BoatParking;

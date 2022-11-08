import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import MobilityPlatformContext from '../../../../../context/MobilityPlatformContext';
import { fetchMobilityMapData } from '../../../mobilityPlatformRequests/mobilityPlatformRequests';
import TextContent from '../../../TextContent';

/**
 * Displays no parking zones of scooters on the map in polygon format.
 */

const NoParking = () => {
  const [noParkingData, setNoParkingData] = useState([]);

  const { openMobilityPlatform, showScooterNoParking } = useContext(MobilityPlatformContext);

  const mapType = useSelector(state => state.settings.mapType);

  const { Polygon, Popup } = global.rL;

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('SNP', 100, setNoParkingData);
    }
  }, [openMobilityPlatform, setNoParkingData]);

  const useContrast = mapType === 'accessible_map';

  const redOptions = { color: 'rgba(251, 5, 21, 255)', weight: 5 };
  const whiteOptions = {
    color: 'rgba(255, 255, 255, 255)', fillOpacity: 0.3, weight: 5, dashArray: '11 2 11',
  };
  const pathOptions = useContrast ? whiteOptions : redOptions;

  const swapCoords = (inputData) => {
    if (inputData.length > 0) {
      return inputData.map(item => item.map(v => [v[1], v[0]]));
    }
    return inputData;
  };

  const map = useMap();

  useEffect(() => {
    if (showScooterNoParking && noParkingData && noParkingData.length > 0) {
      const bounds = [];
      noParkingData.forEach((item) => {
        bounds.push(swapCoords(item.geometry_coords));
      });
      map.fitBounds(bounds);
    }
  }, [showScooterNoParking, noParkingData, map]);

  return (
    <>
      {showScooterNoParking
        && noParkingData
        && noParkingData.length > 0
        && noParkingData.map(item => (
          <Polygon
            key={item.id}
            pathOptions={pathOptions}
            positions={swapCoords(item.geometry_coords)}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: useContrast ? '0.6' : '0.2' });
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: useContrast ? '0.3' : '0.2' });
              },
            }}
          >
            <Popup>
              <TextContent
                titleId="mobilityPlatform.content.scooters.noParkingAreas.title"
                translationId="mobilityPlatform.info.scooters.noParking"
              />
            </Popup>
          </Polygon>
        ))}
    </>
  );
};

export default NoParking;

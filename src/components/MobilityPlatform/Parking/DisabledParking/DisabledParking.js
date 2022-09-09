import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import MobilityPlatformContext from '../../../../context/MobilityPlatformContext';
import { fetchMobilityMapPolygonData } from '../../mobilityPlatformRequests/mobilityPlatformRequests';
import DisabledParkingContent from './components/DisabledParkingContent';

/**
 * Displays disabled parking on the map in polygon format.
 */

const DisabledParking = () => {
  const [publicParkingData, setPublicParkingData] = useState([]);

  const { openMobilityPlatform, showDisabledParking } = useContext(MobilityPlatformContext);

  const mapType = useSelector(state => state.settings.mapType);

  const { Polygon, Popup } = global.rL;

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapPolygonData('NSP', 1000, setPublicParkingData);
    }
  }, [openMobilityPlatform, setPublicParkingData]);

  const disabledParkingData = publicParkingData.filter(item => item.extra.invapaikkoja);

  const blueOptions = { color: 'rgba(7, 44, 115, 255)', weight: 5 };

  const greenOptions = { color: 'rgba(145, 232, 58, 255)', fillOpacity: 0.3, weight: 5 };
  const pathOptions = mapType === 'accessible_map' ? greenOptions : blueOptions;

  const map = useMap();

  useEffect(() => {
    if (showDisabledParking && disabledParkingData && disabledParkingData.length > 0) {
      const bounds = [];
      disabledParkingData.forEach((item) => {
        bounds.push(item.geometry_coords);
      });
      map.fitBounds(bounds);
    }
  }, [showDisabledParking, disabledParkingData, map]);

  return (
    <>
      {showDisabledParking
        && disabledParkingData
        && disabledParkingData.length > 0
        && disabledParkingData.map(item => (
          <>
            <Polygon key={item.id} pathOptions={pathOptions} positions={item.geometry_coords}>
              <Popup>
                <DisabledParkingContent item={item} />
              </Popup>
            </Polygon>
          </>
        ))}
    </>
  );
};

export default DisabledParking;

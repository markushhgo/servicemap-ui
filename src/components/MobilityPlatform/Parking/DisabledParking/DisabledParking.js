import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import disabledParkingIcon from 'servicemap-ui-turku/assets/icons/icons-icon_disabled_parking.svg';
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

  const { Marker, Polygon, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: disabledParkingIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapPolygonData('NSP', 1000, setPublicParkingData);
    }
  }, [openMobilityPlatform, setPublicParkingData]);

  const disabledParkingData = publicParkingData.filter(item => item.extra.invapaikkoja && item.extra.invapaikkoja === item.extra.paikkoja_y);

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

  const getSingleCoordinates = (data) => {
    let coordinates = [];
    data.forEach((item) => {
      item.forEach((coords) => {
        coordinates = coords;
      });
    });
    return coordinates;
  };

  return (
    <>
      {showDisabledParking
        && disabledParkingData
        && disabledParkingData.length > 0
        && disabledParkingData.map(item => (
          <>
            <Polygon key={item.id} pathOptions={pathOptions} positions={item.geometry_coords} />
            <Marker key={item} icon={customIcon} position={getSingleCoordinates(item.geometry_coords)}>
              <Popup>
                <DisabledParkingContent item={item} />
              </Popup>
            </Marker>
          </>
        ))}
    </>
  );
};

export default DisabledParking;

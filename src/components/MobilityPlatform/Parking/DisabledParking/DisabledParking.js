import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import disabledParkingIcon from 'servicemap-ui-turku/assets/icons/icons-icon_disabled_parking.svg';
import MobilityPlatformContext from '../../../../context/MobilityPlatformContext';
import { fetchMobilityMapPolygonData } from '../../mobilityPlatformRequests/mobilityPlatformRequests';
import DisabledParkingContent from './components/DisabledParkingContent';

/**
 * Displays disabled parking areas on the map in polygon and marker format.
 */

const DisabledParking = () => {
  const [disabledParkingData, setDisabledParkingData] = useState([]);

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
      fetchMobilityMapPolygonData('DSP', 1000, setDisabledParkingData);
    }
  }, [openMobilityPlatform, setDisabledParkingData]);

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

  const getSingleCoordinates = data => data[0][0];

  return (
    <>
      {showDisabledParking
        && disabledParkingData
        && disabledParkingData.length > 0
        && disabledParkingData.map(item => (
          <div key={item.id}>
            <Polygon pathOptions={pathOptions} positions={item.geometry_coords} />
            <Marker icon={customIcon} position={getSingleCoordinates(item.geometry_coords)}>
              <Popup className="disabled-parking-popup">
                <DisabledParkingContent item={item} />
              </Popup>
            </Marker>
          </div>
        ))}
    </>
  );
};

export default DisabledParking;

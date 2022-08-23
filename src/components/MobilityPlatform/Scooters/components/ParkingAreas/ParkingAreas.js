import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import scooterParkingIcon from 'servicemap-ui-turku/assets/icons/icons-icon_scooter_parking.svg';
import MobilityPlatformContext from '../../../../../context/MobilityPlatformContext';
import { fetchMobilityMapData } from '../../../mobilityPlatformRequests/mobilityPlatformRequests';

const ParkingAreas = () => {
  const [parkingAreas, setParkingAreas] = useState([]);

  const { openMobilityPlatform, showParkingAreas } = useContext(MobilityPlatformContext);

  const map = useMap();

  const { Marker } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: scooterParkingIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('SPG', 100, setParkingAreas);
    }
  }, [openMobilityPlatform, setParkingAreas]);


  useEffect(() => {
    if (showParkingAreas && parkingAreas && parkingAreas.length > 0) {
      const bounds = [];
      parkingAreas.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showParkingAreas, parkingAreas, map]);

  return (
    <>
      {showParkingAreas ? (
        <>
          {parkingAreas && parkingAreas.length > 0
              && parkingAreas.map(item => (
                <Marker
                  key={item.id}
                  icon={customIcon}
                  position={[item.geometry_coords.lat, item.geometry_coords.lon]}
                />
              ))}
        </>
      ) : null}
    </>
  );
};

export default ParkingAreas;

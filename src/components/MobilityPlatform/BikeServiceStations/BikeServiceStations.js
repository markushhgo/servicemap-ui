import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import bikeServiceIcon from 'servicemap-ui-turku/assets/icons/icons-icon_bike_service_station.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import BikeServiceStationContent from './components/BikeServiceStationContent';
import { createIcon } from '../utils/utils';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const BikeServiceStations = () => {
  const [bikeServiceStations, setBikeServiceStations] = useState([]);

  const { openMobilityPlatform, showBikeServiceStations } = useContext(MobilityPlatformContext);

  const map = useMap();

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon(createIcon(bikeServiceIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('BSS', 100, setBikeServiceStations);
    }
  }, [openMobilityPlatform, setBikeServiceStations]);

  useEffect(() => {
    if (showBikeServiceStations && bikeServiceStations && bikeServiceStations.length > 0) {
      const bounds = [];
      bikeServiceStations.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showBikeServiceStations, bikeServiceStations]);

  return (
    <>
      {showBikeServiceStations ? (
        <div>
          {bikeServiceStations && bikeServiceStations.length > 0
            && bikeServiceStations.map(item => (
              <Marker
                key={item.id}
                icon={customIcon}
                position={[item.geometry_coords.lat, item.geometry_coords.lon]}
              >
                <div>
                  <Popup className="popup-w350">
                    <BikeServiceStationContent
                      station={item}
                    />
                  </Popup>
                </div>
              </Marker>
            ))}
        </div>
      ) : null}
    </>
  );
};

export default BikeServiceStations;

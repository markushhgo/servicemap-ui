import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import bikeServiceIcon from 'servicemap-ui-turku/assets/icons/icons-icon_bike_service_station.svg';
import bikeServiceIconBw from 'servicemap-ui-turku/assets/icons/contrast/icons-icon_bike_service_station-bw.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import BikeServiceStationContent from './components/BikeServiceStationContent';
import { createIcon, isDataValid } from '../utils/utils';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const BikeServiceStations = () => {
  const [bikeServiceStations, setBikeServiceStations] = useState([]);

  const { openMobilityPlatform, showBikeServiceStations } = useContext(MobilityPlatformContext);

  const map = useMap();

  const mapType = useSelector(state => state.settings.mapType);
  const useContrast = mapType === 'accessible_map';

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon(createIcon(useContrast ? bikeServiceIconBw : bikeServiceIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('BSS', 100, setBikeServiceStations);
    }
  }, [openMobilityPlatform, setBikeServiceStations]);

  const renderData = isDataValid(showBikeServiceStations, bikeServiceStations);

  useEffect(() => {
    if (renderData) {
      const bounds = [];
      bikeServiceStations.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showBikeServiceStations, bikeServiceStations]);

  return (
    <>
      {renderData ? (
        bikeServiceStations.map(item => (
          <Marker
            key={item.id}
            icon={customIcon}
            position={[item.geometry_coords.lat, item.geometry_coords.lon]}
          >
            <Popup className="popup-w350">
              <BikeServiceStationContent
                station={item}
              />
            </Popup>
          </Marker>
        ))
      ) : null}
    </>
  );
};

export default BikeServiceStations;

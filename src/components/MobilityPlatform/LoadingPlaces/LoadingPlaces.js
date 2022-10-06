import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import loadingPlaceIcon from 'servicemap-ui-turku/assets/icons/icons-icon_loading_place.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import LoadingPlacesContent from './components/LoadingPlacesContent';

const LoadingPlaces = () => {
  const [loadingPlaces, setLoadingPlaces] = useState([]);

  const { openMobilityPlatform, showLoadingPlaces } = useContext(MobilityPlatformContext);

  const map = useMap();

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const chargerStationIcon = icon({
    iconUrl: loadingPlaceIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('LUP', 100, setLoadingPlaces);
    }
  }, [openMobilityPlatform, setLoadingPlaces]);

  const dataIsValid = showLoadingPlaces && loadingPlaces && loadingPlaces.length > 0;

  useEffect(() => {
    if (dataIsValid) {
      const bounds = [];
      loadingPlaces.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showLoadingPlaces, loadingPlaces]);

  return (
    <>
      {dataIsValid
      && loadingPlaces.map(item => (
        <Marker
          key={item.id}
          icon={chargerStationIcon}
          position={[item.geometry_coords.lat, item.geometry_coords.lon]}
        >
          <>
            <Popup>
              <LoadingPlacesContent item={item} />
            </Popup>
          </>
        </Marker>
      ))}
    </>
  );
};

export default LoadingPlaces;

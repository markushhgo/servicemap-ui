import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import loadingPlaceIcon from 'servicemap-ui-turku/assets/icons/icons-icon_loading_place.svg';
import loadingPlaceIconBw from 'servicemap-ui-turku/assets/icons/contrast/icons-icon_loading_place-bw.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { useAccessibleMap } from '../../../redux/selectors/settings';
import { fetchMobilityMapPolygonData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import { isDataValid, fitPolygonsToBounds, createIcon } from '../utils/utils';
import LoadingPlacesContent from './components/LoadingPlacesContent';

const LoadingPlaces = () => {
  const [loadingPlaces, setLoadingPlaces] = useState([]);

  const { openMobilityPlatform, showLoadingPlaces } = useContext(MobilityPlatformContext);

  const map = useMap();

  const useContrast = useSelector(useAccessibleMap);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon(createIcon(useContrast ? loadingPlaceIconBw : loadingPlaceIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapPolygonData('LoadingUnloadingPlace', 300, setLoadingPlaces);
    }
  }, [openMobilityPlatform, setLoadingPlaces]);

  const renderData = isDataValid(showLoadingPlaces, loadingPlaces);

  useEffect(() => {
    fitPolygonsToBounds(renderData, loadingPlaces, map);
  }, [showLoadingPlaces, loadingPlaces]);

  const getSingleCoordinates = data => data[0][0];

  return (
    <>
      {renderData
        ? loadingPlaces.map(item => (
          <Marker
            key={item.id}
            icon={customIcon}
            position={getSingleCoordinates(item.geometry_coords)}
          >
            <>
              <Popup>
                <LoadingPlacesContent item={item} />
              </Popup>
            </>
          </Marker>
        ))
        : null}
    </>
  );
};

export default LoadingPlaces;
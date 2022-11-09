import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import publicToiletIcon from 'servicemap-ui-turku/assets/icons/icons-icon_toilet.svg';
import publicToiletIconBw from 'servicemap-ui-turku/assets/icons/contrast/icons-icon_toilet-bw.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import { createIcon, isDataValid } from '../utils/utils';
import PublicToiletsContent from './components/PublicToiletsContent';

const PublicToilets = () => {
  const [publicToiletsData, setPublicToiletsData] = useState([]);

  const { openMobilityPlatform, showPublicToilets } = useContext(MobilityPlatformContext);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const mapType = useSelector(state => state.settings.mapType);
  const useContrast = mapType === 'accessible_map';

  const customIcon = icon(createIcon(useContrast ? publicToiletIconBw : publicToiletIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('APT', 100, setPublicToiletsData);
    }
  }, [openMobilityPlatform, setPublicToiletsData]);

  const renderData = isDataValid(showPublicToilets, publicToiletsData);

  const map = useMap();

  useEffect(() => {
    if (renderData) {
      const bounds = [];
      publicToiletsData.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showPublicToilets, publicToiletsData]);

  return (
    <>
      {renderData ? (
        publicToiletsData.map(item => (
          <Marker
            key={item.id}
            icon={customIcon}
            position={[item.geometry_coords.lat, item.geometry_coords.lon]}
          >
            <Popup>
              <PublicToiletsContent />
            </Popup>
          </Marker>
        ))
      ) : null}
    </>
  );
};

export default PublicToilets;

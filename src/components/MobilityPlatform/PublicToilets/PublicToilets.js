import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import publicToiletIcon from 'servicemap-ui-turku/assets/icons/icons-icon_toilet.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import { createIcon } from '../utils/utils';
import PublicToiletsContent from './components/PublicToiletsContent';

const PublicToilets = () => {
  const [publicToiletsData, setPublicToiletsData] = useState([]);

  const { openMobilityPlatform, showPublicToilets } = useContext(MobilityPlatformContext);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon(createIcon(publicToiletIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('APT', 100, setPublicToiletsData);
    }
  }, [openMobilityPlatform, setPublicToiletsData]);

  const map = useMap();

  useEffect(() => {
    if (showPublicToilets && publicToiletsData && publicToiletsData.length > 0) {
      const bounds = [];
      publicToiletsData.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showPublicToilets, publicToiletsData, map]);

  return (
    <>
      {showPublicToilets ? (
        <div>
          {publicToiletsData && publicToiletsData.length > 0
            && publicToiletsData.map(item => (
              <Marker
                key={item.id}
                icon={customIcon}
                position={[item.geometry_coords.lat, item.geometry_coords.lon]}
              >
                <Popup>
                  <PublicToiletsContent />
                </Popup>
              </Marker>
            ))}
        </div>
      ) : null}
    </>
  );
};

export default PublicToilets;

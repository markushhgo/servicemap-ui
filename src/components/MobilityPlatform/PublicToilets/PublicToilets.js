import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import gasFillingIcon from 'servicemap-ui-turku/assets/icons/icons-icon_gas_station.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const PublicToilets = () => {
  const [publicToiletsData, setPublicToiletsData] = useState([]);

  const { openMobilityPlatform, showPublicToilets } = useContext(MobilityPlatformContext);

  const { Marker } = global.rL;
  const { icon } = global.L;

  // TODO change icon
  const gasStationIcon = icon({
    iconUrl: gasFillingIcon,
    iconSize: [45, 45],
  });

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
  }, [showPublicToilets, map]);

  return (
    <>
      {showPublicToilets ? (
        <div>
          {publicToiletsData && publicToiletsData.length > 0
            && publicToiletsData.map(item => (
              <Marker
                key={item.id}
                icon={gasStationIcon}
                position={[item.geometry_coords.lat, item.geometry_coords.lon]}
              />
            ))}
        </div>
      ) : null}
    </>
  );
};

export default PublicToilets;

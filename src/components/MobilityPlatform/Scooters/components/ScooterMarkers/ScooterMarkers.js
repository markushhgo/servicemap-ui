import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import scooterIcon from 'servicemap-ui-turku/assets/icons/icons-icon_scooters_marker.svg';
import MobilityPlatformContext from '../../../../../context/MobilityPlatformContext';
import { fetchIotData2 } from '../../../mobilityPlatformRequests/mobilityPlatformRequests';

const ScooterMarkers = () => {
  const [scooterData, setScooterData] = useState([]);

  const { openMobilityPlatform, showScooters } = useContext(MobilityPlatformContext);

  const { Marker } = global.rL;
  const { icon } = global.L;

  const map = useMap();

  const chargerStationIcon = icon({
    iconUrl: scooterIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData2('SDR', setScooterData);
    }
  }, [openMobilityPlatform, setScooterData]);

  const filteredScooters = scooterData.filter(item => map.getBounds().contains([item.lat, item.lon]));

  return (
    <>
      {showScooters ? (
        <div>
          {filteredScooters && filteredScooters.length > 0
            && filteredScooters.map(item => (
              <Marker
                key={`${item.lon}${item.lat}${item.current_range_meters}`}
                icon={chargerStationIcon}
                position={[item.lat, item.lon]}
              />
            ))}
        </div>
      ) : null}
    </>
  );
};

export default ScooterMarkers;

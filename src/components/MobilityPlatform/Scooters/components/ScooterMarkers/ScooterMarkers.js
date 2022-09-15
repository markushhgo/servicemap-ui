import React, { useContext, useEffect, useState } from 'react';
import scooterIcon from 'servicemap-ui-turku/assets/icons/icons-icon_scooters_marker.svg';
import MobilityPlatformContext from '../../../../../context/MobilityPlatformContext';
import { fetchIotData2 } from '../../../mobilityPlatformRequests/mobilityPlatformRequests';

const ScooterMarkers = () => {
  const [scooterData, setScooterData] = useState([]);

  const { openMobilityPlatform, showScooters } = useContext(MobilityPlatformContext);

  const { Marker } = global.rL;
  const { icon } = global.L;

  const chargerStationIcon = icon({
    iconUrl: scooterIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData2('SDR', setScooterData);
    }
  }, [openMobilityPlatform, setScooterData]);

  return (
    <>
      {showScooters ? (
        <div>
          {scooterData && scooterData.length > 0
            && scooterData.map(item => (
              <Marker
                key={item.lon}
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

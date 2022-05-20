import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import chargerIcon from 'servicemap-ui-turku/assets/icons/icons-icon_charging_station.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import ChargerStationContent from '../ChargerStationContent';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const ChargerStationMarkers = ({ classes }) => {
  const [chargerStations, setChargerStations] = useState([]);

  const { openMobilityPlatform, showChargingStations } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const chargerStationIcon = icon({
    iconUrl: chargerIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData(apiUrl, 'CGS', 150, setChargerStations);
    }
  }, [openMobilityPlatform, setChargerStations]);

  return (
    <>
      {showChargingStations ? (
        <div>
          {chargerStations && chargerStations.length > 0
            && chargerStations.map(item => (
              <Marker
                key={item.id}
                icon={chargerStationIcon}
                position={[item.geometry_coords.lat, item.geometry_coords.lon]}
              >
                <div className={classes.popupWrapper}>
                  <Popup className="charger-stations-popup">
                    <div className={classes.popupInner}>
                      <ChargerStationContent
                        station={item}
                      />
                    </div>
                  </Popup>
                </div>
              </Marker>
            ))}
        </div>
      ) : null}
    </>
  );
};

ChargerStationMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChargerStationMarkers;

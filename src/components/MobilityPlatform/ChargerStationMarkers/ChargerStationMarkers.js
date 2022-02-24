import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import ChargerStationContent from '../ChargerStationContent';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import chargerIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_charging_station.svg';

const ChargerStationMarkers = ({ classes }) => {
  const [chargerStations, setChargerStations] = useState(null);

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
          <div>
            {chargerStations
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
                        stationName={item.name}
                        stationAddress={item.address}
                        chargers={item.extra.chargers}
                        stationUrl={item.extra.url}
                      />
                    </div>
                  </Popup>
                </div>
              </Marker>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

ChargerStationMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChargerStationMarkers;

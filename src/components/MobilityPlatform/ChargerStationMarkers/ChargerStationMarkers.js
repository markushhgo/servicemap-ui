import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import ChargerStationContent from '../ChargerStationContent';
import { fetchStationsData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import chargerIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_charging_station.svg';

const ChargerStationMarkers = ({ classes, showChargingStations }) => {
  const [allStations, setAllStations] = useState(null);
  const [chargerStations, setChargerStations] = useState(null);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const chargerStationIcon = icon({
    iconUrl: chargerIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    fetchStationsData(apiUrl, setAllStations);
  }, [setAllStations]);

  const setStationsByType = () => {
    if (allStations !== null) {
      const cgsArray = [];
      allStations.forEach((item) => {
        if (item.content_type.type_name === 'CGS') {
          cgsArray.push(item);
        }
      });
      setChargerStations(cgsArray);
    }
  };

  useEffect(() => {
    setStationsByType();
  }, [allStations]);

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
                position={[item.geometry_data.y, item.geometry_data.x]}
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
  showChargingStations: PropTypes.bool,
};

ChargerStationMarkers.defaultProps = {
  showChargingStations: false,
};

export default ChargerStationMarkers;

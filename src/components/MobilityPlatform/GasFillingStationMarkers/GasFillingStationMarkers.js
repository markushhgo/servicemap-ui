import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import ChargerStationContent from '../ChargerStationContent';
import { fetchStationsData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import gasFillingIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_gas_station.svg';

const GasFillingStationMarkers = ({ classes, showGasFillingStations }) => {
  const [allStations, setAllStations] = useState(null);
  const [gasFillingStations, setGasFillingStations] = useState(null);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const gasStationIcon = icon({
    iconUrl: gasFillingIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    fetchStationsData(apiUrl, setAllStations);
  }, [setAllStations]);

  const setStationsByType = () => {
    if (allStations !== null) {
      const gfsArray = [];
      allStations.forEach((item) => {
        if (item.content_type.type_name === 'GFS') {
          gfsArray.push(item);
        }
      });
      setGasFillingStations(gfsArray);
    }
  };

  useEffect(() => {
    setStationsByType();
  }, [allStations]);

  return (
    <>
      {showGasFillingStations ? (
        <div>
          <div>
            {gasFillingStations
            && gasFillingStations.map(item => (
              <Marker
                key={item.id}
                icon={gasStationIcon}
                position={[item.geometry_data.y, item.geometry_data.x]}
              >
                <div className={classes.popupWrapper}>
                  <Popup className="charger-stations-popup">
                    <div className={classes.popupInner}>
                      <ChargerStationContent
                        stationName={item.name}
                        stationAddress={item.address}
                        gasType={item.extra.lng_cng}
                        operatorName={item.extra.operator}
                        contentType={item.content_type.type_name}
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

GasFillingStationMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  showGasFillingStations: PropTypes.bool,
};

GasFillingStationMarkers.defaultProps = {
  showGasFillingStations: false,
};

export default GasFillingStationMarkers;

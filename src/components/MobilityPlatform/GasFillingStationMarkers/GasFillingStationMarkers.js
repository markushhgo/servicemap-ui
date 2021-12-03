import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import ChargerStationContent from '../ChargerStationContent';
import { fetchGFSStationsData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import gasFillingIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_gas_station.svg';

const GasFillingStationMarkers = ({ classes }) => {
  const [gasFillingStations, setGasFillingStations] = useState(null);

  const { showGasFillingStations } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const gasStationIcon = icon({
    iconUrl: gasFillingIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    fetchGFSStationsData(apiUrl, setGasFillingStations);
  }, [setGasFillingStations]);

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
                position={[item.geometry_coords.lat, item.geometry_coords.lon]}
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
};


export default GasFillingStationMarkers;

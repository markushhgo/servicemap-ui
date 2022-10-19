import { PropTypes } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import gasFillingIcon from 'servicemap-ui-turku/assets/icons/icons-icon_gas_station.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import { createIcon } from '../utils/utils';
import GasFillingStationContent from './components/GasFillingStationContent';

const GasFillingStationMarkers = ({ classes }) => {
  const [gasFillingStations, setGasFillingStations] = useState([]);

  const { openMobilityPlatform, showGasFillingStations } = useContext(MobilityPlatformContext);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const gasStationIcon = icon(createIcon(gasFillingIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('GFS', 10, setGasFillingStations);
    }
  }, [openMobilityPlatform, setGasFillingStations]);

  const map = useMap();

  useEffect(() => {
    if (showGasFillingStations && gasFillingStations && gasFillingStations.length > 0) {
      const bounds = [];
      gasFillingStations.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showGasFillingStations]);

  return (
    <>
      {showGasFillingStations ? (
        <div>
          {gasFillingStations && gasFillingStations.length > 0
            && gasFillingStations.map(item => (
              <Marker
                key={item.id}
                icon={gasStationIcon}
                position={[item.geometry_coords.lat, item.geometry_coords.lon]}
              >
                <div className={classes.popupWrapper}>
                  <Popup className="popup-w350">
                    <div className={classes.popupInner}>
                      <GasFillingStationContent
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

GasFillingStationMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default GasFillingStationMarkers;

import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import EcoCounterContent from '../EcoCounterContent';
import { fetchEcoCounterStations } from '../EcoCounterRequests/ecoCounterRequests';
import markerIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_ecocounter.svg';

const EcoCounterMarkers = ({ classes }) => {
  const [ecoCounterStations, setEcoCounterStations] = useState([]);

  const { openMobilityPlatform, showEcoCounter } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const ecoCounterIcon = icon({
    iconUrl: markerIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchEcoCounterStations(apiUrl, setEcoCounterStations);
    }
  }, [openMobilityPlatform, setEcoCounterStations]);

  const map = useMap();

  useEffect(() => {
    if (showEcoCounter && ecoCounterStations && ecoCounterStations.length > 0) {
      const bounds = [];
      ecoCounterStations.forEach((item) => {
        bounds.push([item.lat, item.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showEcoCounter]);

  return (
    <>
      {showEcoCounter ? (
        <div>
          <div>
            {ecoCounterStations && ecoCounterStations.length > 0 && ecoCounterStations.map(item => (
              <Marker key={item.id} icon={ecoCounterIcon} position={[item.lat, item.lon]}>
                <div className={classes.popupWrapper}>
                  <Popup className="ecocounter-popup">
                    <div className={classes.popupInner}>
                      <EcoCounterContent
                        stationId={item.id}
                        stationName={item.name}
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

EcoCounterMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EcoCounterMarkers;

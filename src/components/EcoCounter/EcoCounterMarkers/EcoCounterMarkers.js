import { PropTypes } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import ecoCounterIcon from 'servicemap-ui-turku/assets/icons/icons-icon_ecocounter.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { createIcon } from '../../MobilityPlatform/utils/utils';
import { fetchEcoCounterStations } from '../EcoCounterRequests/ecoCounterRequests';
import EcoCounterContent from '../EcoCounterContent';

const EcoCounterMarkers = ({ classes }) => {
  const [ecoCounterStations, setEcoCounterStations] = useState([]);

  const { openMobilityPlatform, showEcoCounter } = useContext(MobilityPlatformContext);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon(createIcon(ecoCounterIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchEcoCounterStations(setEcoCounterStations);
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
              <Marker key={item.id} icon={customIcon} position={[item.lat, item.lon]}>
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

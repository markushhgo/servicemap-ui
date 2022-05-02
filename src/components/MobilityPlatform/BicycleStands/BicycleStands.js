import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useMapEvents, useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import BicycleStandContent from '../BicycleStandContent';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import bicycleStandIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle-stand.svg';
import circleIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon-circle.svg';

const BicycleStands = ({ classes }) => {
  const [bicycleStands, setBicycleStands] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(13);

  const { openMobilityPlatform, showBicycleStands } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const chargerStationIcon = icon({
    iconUrl: zoomLevel < 15 ? circleIcon : bicycleStandIcon,
    iconSize: zoomLevel < 15 ? [15, 15] : [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData(apiUrl, 'BIS', 100, setBicycleStands);
    }
  }, [openMobilityPlatform, setBicycleStands]);

  const maintainedBicycleStands = bicycleStands.filter(item => item.extra.maintained_by_turku);

  const mapEvent = useMapEvents({
    zoomend() {
      setZoomLevel(mapEvent.getZoom());
    },
  });

  const map = useMap();

  useEffect(() => {
    if (showBicycleStands && maintainedBicycleStands) {
      const bounds = [];
      maintainedBicycleStands.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showBicycleStands]);

  return (
    <>
      {showBicycleStands ? (
        <div>
          <div>
            {maintainedBicycleStands && maintainedBicycleStands.length > 0
              && maintainedBicycleStands.map(item => (
                <Marker
                  key={item.id}
                  icon={chargerStationIcon}
                  position={[item.geometry_coords.lat, item.geometry_coords.lon]}
                >
                  <div className={classes.popupWrapper}>
                    <Popup>
                      <div className={classes.popupInner}>
                        <BicycleStandContent
                          bicycleStand={item}
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

BicycleStands.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BicycleStands;

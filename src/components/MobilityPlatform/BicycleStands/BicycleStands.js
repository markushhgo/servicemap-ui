import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useMapEvents, useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import BicycleStandContent from '../BicycleStandContent';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import bicycleStandIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle-stand.svg';
import circleIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_circle_border.svg';

const BicycleStands = ({ classes }) => {
  const [bicycleStands, setBicycleStands] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(13);

  const { openMobilityPlatform, showBicycleStands } = useContext(MobilityPlatformContext);

  const map = useMap();

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: zoomLevel < 14 ? circleIcon : bicycleStandIcon,
    iconSize: zoomLevel < 14 ? [15, 15] : [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('BIS', 1000, setBicycleStands);
    }
  }, [openMobilityPlatform, setBicycleStands]);


  const mapEvent = useMapEvents({
    zoomend() {
      setZoomLevel(mapEvent.getZoom());
    },
  });

  useEffect(() => {
    if (showBicycleStands && bicycleStands && bicycleStands.length > 0) {
      const bounds = [];
      bicycleStands.forEach((item) => {
        bounds.push([item.geometry_coords.lat, item.geometry_coords.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showBicycleStands, bicycleStands]);

  return (
    <>
      {showBicycleStands ? (
        <div>
          {bicycleStands && bicycleStands.length > 0
              && bicycleStands.map(item => (
                <Marker
                  key={item.id}
                  icon={customIcon}
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
      ) : null}
    </>
  );
};

BicycleStands.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BicycleStands;

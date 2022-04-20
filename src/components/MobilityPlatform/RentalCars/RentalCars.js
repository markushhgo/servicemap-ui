import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useMapEvents } from 'react-leaflet';
import RentalCarsContent from './components/RentalCarsContent';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import rentalCarIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_rental_car.svg';
import providerIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon-24rent.png';

const RentalCars = ({ classes }) => {
  const [iotData, setIotData] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(13);

  const { openMobilityPlatform, showRentalCars } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const map = useMapEvents({
    zoomend() {
      setZoomLevel(map.getZoom());
    },
  });

  const customIcon = icon({
    iconUrl: zoomLevel < 16 ? rentalCarIcon : providerIcon,
    iconSize: zoomLevel < 16 ? [45, 45] : [50, 25],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'R24', setIotData);
    }
  }, [openMobilityPlatform, setIotData]);

  return (
    <>
      {showRentalCars ? (
        <div>
          {iotData
            && iotData.map(item => (
              <Marker
                key={item.id}
                icon={customIcon}
                position={[item.homeLocationData.coordinates.latitude, item.homeLocationData.coordinates.longitude]}
              >
                <div className={classes.popupWrapper}>
                  <Popup className="rental-cars-popup">
                    <div className={classes.popupInner}>
                      <RentalCarsContent
                        car={item}
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

RentalCars.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RentalCars;

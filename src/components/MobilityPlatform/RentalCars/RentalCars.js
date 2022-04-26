import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useMapEvents } from 'react-leaflet';
import RentalCarsContent from './components/RentalCarsContent';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import rentalCarIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_rental_car.svg';
import providerIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_24rent.svg';

const RentalCars = ({ classes }) => {
  const [rentalCarsData, setRentalCarsData] = useState([]);
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
    iconUrl: zoomLevel < 15 ? rentalCarIcon : providerIcon,
    iconSize: zoomLevel < 15 ? [45, 45] : [50, 56],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchIotData(apiUrl, 'R24', setRentalCarsData);
    }
  }, [openMobilityPlatform, setRentalCarsData]);

  return (
    <>
      {showRentalCars ? (
        <div>
          {rentalCarsData && rentalCarsData.length > 0
            && rentalCarsData.filter(item => item.availabilityData.available).map(item => (
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

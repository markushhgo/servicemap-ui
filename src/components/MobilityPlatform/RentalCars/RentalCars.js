import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import RentalCarsContent from './components/RentalCarsContent';
import { fetchIotData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import carIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_rental_car.svg';

const RentalCars = ({ classes }) => {
  const [iotData, setIotData] = useState(null);

  const { openMobilityPlatform, showRentalCars } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: carIcon,
    iconSize: [45, 45],
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

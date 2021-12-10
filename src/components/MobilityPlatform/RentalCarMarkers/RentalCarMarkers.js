import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import RentalCarContent from '../RentalCarContent';
import carIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_rental-car.svg';
import jsonFile from '../../../../node_modules/servicemap-ui-turku/assets/files/rental-cars.json';

const RentalCarMarkers = ({ classes }) => {
  const [rentalCarLocations, setRentalCarLocations] = useState(null);

  const { showRentalCars } = useContext(MobilityPlatformContext);

  // const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const rentalCarIcon = icon({
    iconUrl: carIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    setRentalCarLocations(jsonFile);
  }, [setRentalCarLocations]);

  return (
    <>
      {showRentalCars ? (
        <div>
          <div>
            {rentalCarLocations
            && rentalCarLocations.map(item => (
              <Marker
                key={item.id}
                icon={rentalCarIcon}
                position={[item.homeLocationData.coordinates.latitude, item.homeLocationData.coordinates.longitude]}
              >
                <div className={classes.popupWrapper}>
                  <Popup>
                    <div className={classes.popupInner}>
                      <RentalCarContent
                        address={item.homeLocationData.address}
                        carManufacturer={item.vehicleModelData.manufacturer}
                        carModel={item.vehicleModelData.name}
                        availability={item.availabilityData.available}
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

RentalCarMarkers.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RentalCarMarkers;

import React, { useEffect, useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import BicycleStandContent from '../BicycleStandContent';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import bicycleStandIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_bicycle-stand.svg';

const BicycleStands = ({ classes }) => {
  const [bicycleStands, setBicycleStands] = useState(null);
  const [maintainedBicycleStands, setMaintainedBicycleStands] = useState(null);

  const { openMobilityPlatform, showBicycleStands } = useContext(MobilityPlatformContext);

  const apiUrl = window.nodeEnvSettings.MOBILITY_PLATFORM_API;

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const chargerStationIcon = icon({
    iconUrl: bicycleStandIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData(apiUrl, 'BIS', 100, setBicycleStands);
    }
  }, [openMobilityPlatform, setBicycleStands]);

  useEffect(() => {
    const filtered = [];
    if (bicycleStands && openMobilityPlatform) {
      bicycleStands.forEach((item) => {
        if (item.extra.maintained_by_turku === true) {
          filtered.push(item);
        }
      });
      setMaintainedBicycleStands(filtered);
    }
  }, [openMobilityPlatform, bicycleStands]);

  return (
    <>
      {showBicycleStands ? (
        <div>
          <div>
            {maintainedBicycleStands
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
                          standName={item.name}
                          standModel={item.extra.model}
                          standCover={item.extra.covered}
                          hullLockable={item.extra.hull_lockable}
                          numOfPlaces={item.extra.number_of_places}
                          numOfStands={item.extra.number_of_stands}
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

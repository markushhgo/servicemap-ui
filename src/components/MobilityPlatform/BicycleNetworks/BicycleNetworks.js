import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchBicycleNetworkData } from '../mobilityPlatformRequests/mobilityPlatformRequests';

const BicycleNetworks = () => {
  const [bicycleMain, setBicycleMain] = useState(null);
  const [bicycleLocal, setBicycleLocal] = useState(null);
  const [bicycleLanes, setBicycleLanes] = useState(null);

  const { showBicycleNetwork, showBicycleLocal, showBicycleLanes } = useContext(MobilityPlatformContext);

  const { Polyline } = global.rL;

  const apiUrl = window.nodeEnvSettings.BICYCLE_NETWORK_API;

  const mainNetwork = 'main_network';
  const localNetwork = 'local_network';
  const qualityLanes = 'quality_lanes';

  const blackOptions = { color: '#000000' };
  const blueOptions = { color: 'rgba(0, 45, 113, 255)' };
  const whiteDashOptions = { color: '#fff', dashArray: '15' };
  const whiteSolidOptions = { color: '#fff' };
  const colorOptions = { color: 'rgba(7, 44,115, 255)', dashArray: '6' };

  useEffect(() => {
    fetchBicycleNetworkData(apiUrl, mainNetwork, setBicycleMain);
  }, [setBicycleMain]);

  useEffect(() => {
    fetchBicycleNetworkData(apiUrl, localNetwork, setBicycleLocal);
  }, [setBicycleLocal]);

  useEffect(() => {
    fetchBicycleNetworkData(apiUrl, qualityLanes, setBicycleLanes);
  }, [setBicycleLanes]);

  const filterNullGeometry = (inputData) => {
    const filtered = [];
    if (inputData !== null) {
      inputData.forEach((item) => {
        if (item !== null) {
          filtered.push(item);
        }
      });
    }
    return filtered;
  };

  return (
    <div>
      <div>
        {showBicycleNetwork ? (
          <div>
            <div>
              {bicycleMain
                && bicycleMain.map(item => (
                  <Polyline key={item.id} weight={8} pathOptions={blueOptions} positions={[item.geometry_coords]} />
                ))}
            </div>
            <div>
              {bicycleMain
                && bicycleMain.map(item => (
                  <Polyline key={item.id} weight={4} pathOptions={whiteDashOptions} positions={[item.geometry_coords]} />
                ))}
            </div>
          </div>
        ) : null}
      </div>
      <div>
        {showBicycleLocal ? (
          <div>
            <div>
              {bicycleLocal
                && bicycleLocal.map(item => (
                  <Polyline
                    key={item.id}
                    weight={8}
                    pathOptions={blackOptions}
                    positions={filterNullGeometry(item.geometry_coords)}
                  />
                ))}
            </div>
            <div>
              {bicycleLocal
                && bicycleLocal.map(item => (
                  <Polyline
                    key={item.id}
                    weight={4}
                    pathOptions={whiteSolidOptions}
                    positions={filterNullGeometry(item.geometry_coords)}
                  />
                ))}
            </div>
          </div>
        ) : null}
      </div>
      <div>
        {showBicycleLanes ? (
          <div>
            <div>
              {bicycleLanes
                && bicycleLanes.map(item => (
                  <Polyline key={item.id} weight={4} pathOptions={colorOptions} positions={[item.geometry_coords]} />
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BicycleNetworks;

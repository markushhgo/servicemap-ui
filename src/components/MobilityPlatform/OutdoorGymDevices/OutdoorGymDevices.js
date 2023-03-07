/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import sportIconContrast from 'servicemap-ui-turku/assets/icons/contrast/icons-icon_outdoor_gym-bw.svg';
import sportIcon from 'servicemap-ui-turku/assets/icons/icons-icon_outdoor_gym.svg';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { useAccessibleMap } from '../../../redux/selectors/settings';
import { fetchMobilityMapData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import { isDataValid, fitToMapBounds, createIcon } from '../utils/utils';
import MarkerComponent from '../MarkerComponent';
import OutdoorGymDevicesContent from './components/OutdoorGymDevicesContent';

const OutdoorGymDevices = () => {
  const [outdoorGymDevices, setOutdoorGymDevices] = useState([]);

  const { openMobilityPlatform, showOutdoorGymDevices } = useContext(MobilityPlatformContext);

  const useContrast = useSelector(useAccessibleMap);

  const map = useMap();

  const { icon } = global.L;

  const customIcon = icon(createIcon(useContrast ? sportIconContrast : sportIcon));

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapData('OutdoorGymDevice', 100, setOutdoorGymDevices);
    }
  }, [openMobilityPlatform, setOutdoorGymDevices]);

  const renderData = isDataValid(showOutdoorGymDevices, outdoorGymDevices);

  useEffect(() => {
    fitToMapBounds(renderData, outdoorGymDevices, map);
  }, [showOutdoorGymDevices, outdoorGymDevices]);

  return (
    <>
      {renderData ? (
        outdoorGymDevices.map(item => (
          <MarkerComponent
            key={item.id}
            item={item}
            icon={customIcon}
          >
            <OutdoorGymDevicesContent item={item} />
          </MarkerComponent>
        ))
      ) : null}
    </>
  );
};

export default OutdoorGymDevices;
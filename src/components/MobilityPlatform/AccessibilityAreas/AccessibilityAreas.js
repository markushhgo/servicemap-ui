/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import walkingIcon from 'servicemap-ui-turku/assets/icons/icons-icon_walking_area.svg';
import walkingIconBw from 'servicemap-ui-turku/assets/icons/contrast/icons-icon_walking_area-bw.svg';
import cyclingIcon from 'servicemap-ui-turku/assets/icons/icons-icon_cycling_area.svg';
import cyclingIconBw from 'servicemap-ui-turku/assets/icons/contrast/icons-icon_cycling_area-bw.svg';
import { useMobilityPlatformContext } from '../../../context/MobilityPlatformContext';
import { useAccessibleMap } from '../../../redux/selectors/settings';
import useMobilityDataFetch from '../utils/useMobilityDataFetch';
import {
  isDataValid,
  createIcon,
  fitPolygonsToBounds,
  blueOptionsBase,
  whiteOptionsBase,
  greenOptionsBase,
  blackOptionsBase,
} from '../utils/utils';
import PolygonComponent from '../PolygonComponent';
import AccessibilityAreasContent from './components/AccessibilityAreasContent';

/**
 * Displays school accessibility areas on the map in polygon format.
 */

const AccessibilityAreas = () => {
  const options = {
    type_name: 'SchoolAndKindergartenAccessibilityArea',
    latlon: true,
    page_size: 150,
  };
  const { showAccessibilityAreas } = useMobilityPlatformContext();

  const selectedUnit = useSelector(state => state.selectedUnit?.unit?.data);
  const unitId = selectedUnit?.id;
  const useContrast = useSelector(useAccessibleMap);

  const map = useMap();
  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const blueOptions = blueOptionsBase({ weight: 5, dashArray: '12 6 3' });
  const greenOptions = greenOptionsBase({ weight: 5 });
  const blackOptions = blackOptionsBase({ weight: 5 });
  const whiteOptions = whiteOptionsBase({
    fillOpacity: 0.3,
    weight: 5,
    dashArray: '12',
  });

  const getPathOptions = transportType => {
    if (transportType?.includes('kävely')) {
      return blueOptions;
    }
    if (transportType?.includes('pyöräily')) {
      return greenOptions;
    }
    if (useContrast) {
      return whiteOptions;
    }
    return blackOptions;
  };

  const walkingAreaIcon = icon(createIcon(useContrast ? walkingIconBw : walkingIcon, true));
  const cyclingAreaIcon = icon(createIcon(useContrast ? cyclingIconBw : cyclingIcon, true));

  const getCorrectIcon = transportType => {
    if (transportType?.includes('kävely')) {
      return walkingAreaIcon;
    }
    return cyclingAreaIcon;
  };

  const { data } = useMobilityDataFetch(options, showAccessibilityAreas);

  const filteredAreas = data.filter(item => item.extra?.kohde_ID === unitId);
  const filteredAreasWalking = data.filter(item => item.extra?.kohde_ID === unitId && item?.extra?.kulkumuoto?.includes('kävely'));
  const filteredAreasCycling = data.filter(
    item => item.extra?.kohde_ID === unitId && item?.extra?.kulkumuoto?.includes('pyöräily'),
  );
  const renderAll = isDataValid(showAccessibilityAreas.all, filteredAreas);
  const renderWalking = isDataValid(showAccessibilityAreas.walking, filteredAreasWalking);
  const renderCycling = isDataValid(showAccessibilityAreas.cycling, filteredAreasCycling);

  useEffect(() => {
    fitPolygonsToBounds(renderAll, filteredAreas, map);
  }, [showAccessibilityAreas.all, filteredAreas]);

  useEffect(() => {
    fitPolygonsToBounds(renderWalking, filteredAreasWalking, map);
  }, [showAccessibilityAreas.walking, filteredAreasWalking]);

  useEffect(() => {
    fitPolygonsToBounds(renderCycling, filteredAreasCycling, map);
  }, [showAccessibilityAreas.cycling, filteredAreasCycling]);

  const getSingleCoordinates = data => data[0][0];

  const renderMarkers = (showData, data) => (showData
    ? data.map(item => (
      <div key={item.id}>
        <Marker icon={getCorrectIcon(item.extra.kulkumuoto)} position={getSingleCoordinates(item.geometry_coords)}>
          <Popup>
            <AccessibilityAreasContent item={item} />
          </Popup>
        </Marker>
      </div>
    ))
    : null);

  const renderPolygons = (showData, data) => (showData
    ? data.map(item => (
      <PolygonComponent
        key={item.id}
        item={item}
        useContrast={useContrast}
        pathOptions={getPathOptions(item.extra.kulkumuoto)}
      >
        <AccessibilityAreasContent item={item} />
      </PolygonComponent>
    ))
    : null);

  return (
    <>
      {renderMarkers(renderAll, filteredAreas)}
      {renderPolygons(renderAll, filteredAreas)}
      {renderPolygons(renderWalking, filteredAreasWalking)}
      {renderPolygons(renderCycling, filteredAreasCycling)}
    </>
  );
};

export default AccessibilityAreas;

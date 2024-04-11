/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { useMobilityPlatformContext } from '../../../context/MobilityPlatformContext';
import { useAccessibleMap } from '../../../redux/selectors/settings';
import useMobilityDataFetch from '../utils/useMobilityDataFetch';
import {
  isDataValid, fitPolygonsToBounds, blueOptionsBase, whiteOptionsBase, greenOptionsBase,
  blackOptionsBase,
} from '../utils/utils';
import PolygonComponent from '../PolygonComponent';

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
  const unitName = selectedUnit?.name?.fi;
  const useContrast = useSelector(useAccessibleMap);

  const map = useMap();

  const blueOptions = blueOptionsBase({ weight: 5, dashArray: '12 6 3' });
  const greenOptions = greenOptionsBase({ weight: 5, dashArray: '4 6 8' });
  const blackOptions = blackOptionsBase({ weight: 5 });
  const whiteOptions = whiteOptionsBase({
    fillOpacity: 0.3,
    weight: 5,
    dashArray: '12',
  });

  const getPathOptions = transportType => {
    if (transportType.includes('kävely')) {
      return blueOptions;
    }
    if (transportType.includes('pyöräily')) {
      return greenOptions;
    }
    if (useContrast) {
      return whiteOptions;
    }
    return blackOptions;
  };

  // const pathOptions = useContrast ? whiteOptions : blueOptions;

  const { data } = useMobilityDataFetch(options, showAccessibilityAreas);

  const filteredAreas = data.filter(item => item.name === unitName);
  const filteredAreasWalking = data.filter(item => item.name === unitName && item.extra.Kulkumuoto.includes('kävely'));
  const filteredAreasCycling = data.filter(item => item.name === unitName && item.extra.Kulkumuoto.includes('pyöräily'));
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

  const renderPolygons = (showData, data) => (
    showData
      ? data.map(item => (
        <PolygonComponent
          key={item.id}
          item={item}
          useContrast={useContrast}
          pathOptions={getPathOptions(item.extra.Kulkumuoto)}
        >
          <p>{item.name}</p>
          <p>{item.extra.Kulkumuoto}</p>
          <p>{item.extra.Minuutit}</p>
        </PolygonComponent>
      ))
      : null
  );

  return (
    <>
      {renderPolygons(renderAll, filteredAreas)}
      {renderPolygons(renderWalking, filteredAreasWalking)}
      {renderPolygons(renderCycling, filteredAreasCycling)}
    </>
  );
};

export default AccessibilityAreas;

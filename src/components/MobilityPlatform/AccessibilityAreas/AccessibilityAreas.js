/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { useMobilityPlatformContext } from '../../../context/MobilityPlatformContext';
import { useAccessibleMap } from '../../../redux/selectors/settings';
import useMobilityDataFetch from '../utils/useMobilityDataFetch';
import {
  isDataValid, fitPolygonsToBounds, blueOptionsBase, whiteOptionsBase,
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

  const blueOptions = blueOptionsBase({ weight: 5 });
  const whiteOptions = whiteOptionsBase({
    fillOpacity: 0.3,
    weight: 5,
    dashArray: '12',
  });
  const pathOptions = useContrast ? whiteOptions : blueOptions;

  const { data } = useMobilityDataFetch(options, showAccessibilityAreas);

  const filteredAreas = data.filter(item => item.name === unitName);
  const renderData = isDataValid(showAccessibilityAreas, filteredAreas);

  useEffect(() => {
    fitPolygonsToBounds(renderData, filteredAreas, map);
  }, [showAccessibilityAreas, filteredAreas]);

  return (
    renderData
      ? filteredAreas.map(item => (
        <PolygonComponent
          key={item.id}
          item={item}
          useContrast={useContrast}
          pathOptions={pathOptions}
        >
          <p>{item.name}</p>
          <p>{item.extra.Kulkumuoto}</p>
          <p>{item.extra.Minuutit}</p>
        </PolygonComponent>
      ))
      : null
  );
};

export default AccessibilityAreas;

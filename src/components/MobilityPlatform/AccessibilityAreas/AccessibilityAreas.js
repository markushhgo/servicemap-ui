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
import {
  isDataValid,
  createIcon,
  fitPolygonsToBounds,
  setRender,
  blueOptionsBase,
  whiteOptionsBase,
  greenOptionsBase,
  blackOptionsBase,
} from '../utils/utils';
import { isEmbed } from '../../../utils/path';
import PolygonComponent from '../PolygonComponent';
import AccessibilityAreasContent from './components/AccessibilityAreasContent';

/**
 * Displays school accessibility areas on the map in polygon format.
 */
const AccessibilityAreas = () => {
  const { showAccessibilityAreas, accessibilityAreasData } = useMobilityPlatformContext();

  const selectedUnit = useSelector(state => state.selectedUnit?.unit?.data);
  const unitId = selectedUnit?.id;
  const useContrast = useSelector(useAccessibleMap);

  const url = new URL(window.location);
  const embedded = isEmbed({ url: url.toString() });

  const map = useMap();
  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const blueOptions = blueOptionsBase({ weight: 5, dashArray: '12 6 3', fillOpacity: '0' });
  const greenOptions = greenOptionsBase({ weight: 5, fillOpacity: '0' });
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

  const paramValue = url.searchParams.get('accessibility_areas') === '1';
  const paramValueWalk = url.searchParams.get('accessibility_areas_walk') === '1';
  const paramValueBicycle = url.searchParams.get('accessibility_areas_bicycle') === '1';
  const filteredAreasWalking = accessibilityAreasData.filter(
    item => item.extra?.kohde_ID === unitId && item?.extra?.kulkumuoto?.includes('kävely'),
  );
  const filteredAreasCycling = accessibilityAreasData.filter(
    item => item.extra?.kohde_ID === unitId && item?.extra?.kulkumuoto?.includes('pyöräily'),
  );
  const renderAll = setRender(paramValue, embedded, showAccessibilityAreas.all, accessibilityAreasData, isDataValid);
  const renderWalking = setRender(paramValueWalk, embedded, showAccessibilityAreas.walking, filteredAreasWalking, isDataValid);
  const renderCycling = setRender(paramValueBicycle, embedded, showAccessibilityAreas.cycling, filteredAreasCycling, isDataValid);

  useEffect(() => {
    if (!embedded) {
      fitPolygonsToBounds(renderAll, accessibilityAreasData, map);
    }
  }, [showAccessibilityAreas.all, accessibilityAreasData]);

  useEffect(() => {
    if (!embedded) {
      fitPolygonsToBounds(renderWalking, filteredAreasWalking, map);
    }
  }, [showAccessibilityAreas.walking, filteredAreasWalking]);

  useEffect(() => {
    if (!embedded) {
      fitPolygonsToBounds(renderCycling, filteredAreasCycling, map);
    }
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
        isTransparent
      >
        <AccessibilityAreasContent item={item} />
      </PolygonComponent>
    ))
    : null);

  return (
    <>
      {renderMarkers(renderAll, accessibilityAreasData)}
      {renderMarkers(renderWalking, filteredAreasWalking)}
      {renderMarkers(renderCycling, filteredAreasCycling)}
      {renderPolygons(renderAll, accessibilityAreasData)}
      {renderPolygons(renderWalking, filteredAreasWalking)}
      {renderPolygons(renderCycling, filteredAreasCycling)}
    </>
  );
};

export default AccessibilityAreas;

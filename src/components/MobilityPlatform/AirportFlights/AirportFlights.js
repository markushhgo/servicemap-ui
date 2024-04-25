/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import bikeServiceIconBw from 'servicemap-ui-turku/assets/icons/contrast/icons-icon_bike_service_station-bw.svg';
import airPlaneIcon from 'servicemap-ui-turku/assets/icons/icons-icon_airplane.svg';
import { useMobilityPlatformContext } from '../../../context/MobilityPlatformContext';
import { useAccessibleMap } from '../../../redux/selectors/settings';
import { createIcon } from '../utils/utils';
import { StyledPopupWrapper, StyledPopupInner } from '../styled/styled';

const AirportFlights = () => {
  const { showAirports } = useMobilityPlatformContext();

  const map = useMap();

  const useContrast = useSelector(useAccessibleMap);

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon(createIcon(useContrast ? bikeServiceIconBw : airPlaneIcon));

  const airportData = {
    id: 'airports',
    lat: 60.514722,
    lon: 22.261667,
  };

  useEffect(() => {
    if (showAirports) {
      const bounds = [];
      bounds.push([airportData.lat, airportData.lon]);
      map.fitBounds(bounds);
    }
  }, [showAirports]);

  // TODO update content
  return showAirports ? (
    <Marker icon={customIcon} position={[airportData.lat, airportData.lon]}>
      <StyledPopupWrapper>
        <Popup>
          <StyledPopupInner>
            <p>abc</p>
          </StyledPopupInner>
        </Popup>
      </StyledPopupWrapper>
    </Marker>
  ) : null;
};

export default AirportFlights;

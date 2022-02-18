import React from 'react';
import ChargerStationMarkers from '../../components/MobilityPlatform/ChargerStationMarkers';
import GasFillingStationMarkers from '../../components/MobilityPlatform/GasFillingStationMarkers';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import SnowPlows from '../../components/MobilityPlatform/SnowPlows';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';

const MobilityPlatformMapView = () => (
  <>
    <ChargerStationMarkers />
    <GasFillingStationMarkers />
    <EcoCounterMarkers />
    <BicycleStands />
    <SnowPlows />
    <CultureRoutes />
  </>
);

export default MobilityPlatformMapView;

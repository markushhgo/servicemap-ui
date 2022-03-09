import React from 'react';
import ChargerStationMarkers from '../../components/MobilityPlatform/ChargerStationMarkers';
import GasFillingStationMarkers from '../../components/MobilityPlatform/GasFillingStationMarkers';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';

const MobilityPlatformMapView = () => (
  <>
    <ChargerStationMarkers />
    <GasFillingStationMarkers />
    <EcoCounterMarkers />
    <BicycleStands />
    <BicycleRoutes />
    <CultureRoutes />
  </>
);

export default MobilityPlatformMapView;

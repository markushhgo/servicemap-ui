import React from 'react';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';
import RentalCars from '../../components/MobilityPlatform/RentalCars';
import GasFillingStationMarkers from '../../components/MobilityPlatform/GasFillingStationMarkers';
import SpeedLimitZones from '../../components/MobilityPlatform/SpeedLimitZones';

const MobilityPlatformMapView = () => (
  <>
    <EcoCounterMarkers />
    <BicycleStands />
    <BicycleRoutes />
    <CultureRoutes />
    <RentalCars />
    <GasFillingStationMarkers />
    <SpeedLimitZones />
  </>
);

export default MobilityPlatformMapView;

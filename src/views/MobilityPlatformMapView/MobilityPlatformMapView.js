import React from 'react';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import SnowPlows from '../../components/MobilityPlatform/SnowPlows';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';
import ParkingSpaces from '../../components/MobilityPlatform/ParkingSpaces';

const MobilityPlatformMapView = () => (
  <>
    <EcoCounterMarkers />
    <BicycleStands />
    <SnowPlows />
    <BicycleRoutes />
    <CultureRoutes />
    <ParkingSpaces />
  </>
);

export default MobilityPlatformMapView;

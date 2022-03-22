import React from 'react';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import SnowPlows from '../../components/MobilityPlatform/SnowPlows';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';
import RentalCars from '../../components/MobilityPlatform/RentalCars';

const MobilityPlatformMapView = () => (
  <>
    <EcoCounterMarkers />
    <BicycleStands />
    <SnowPlows />
    <BicycleRoutes />
    <CultureRoutes />
    <RentalCars />
  </>
);

export default MobilityPlatformMapView;

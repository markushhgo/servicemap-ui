import React from 'react';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';

const MobilityPlatformMapView = () => (
  <>
    <EcoCounterMarkers />
    <BicycleStands />
    <BicycleRoutes />
    <CultureRoutes />
  </>
);

export default MobilityPlatformMapView;

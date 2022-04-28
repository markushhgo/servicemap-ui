import React from 'react';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';
import ParkingSpaces from '../../components/MobilityPlatform/ParkingSpaces';
import PaymentZones from '../../components/MobilityPlatform/PaymentZones';

const MobilityPlatformMapView = () => (
  <>
    <EcoCounterMarkers />
    <BicycleStands />
    <BicycleRoutes />
    <CultureRoutes />
    <ParkingSpaces />
    <PaymentZones />
  </>
);

export default MobilityPlatformMapView;

import React from 'react';
import ChargerStationMarkers from '../../components/MobilityPlatform/ChargerStationMarkers';
import GasFillingStationMarkers from '../../components/MobilityPlatform/GasFillingStationMarkers';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import ParkingSpaces from '../../components/MobilityPlatform/ParkingSpaces';

const MobilityPlatformMapView = () => (
  <>
    <ChargerStationMarkers />
    <GasFillingStationMarkers />
    <EcoCounterMarkers />
    <BicycleStands />
    <CultureRoutes />
    <ParkingSpaces />
  </>
);

export default MobilityPlatformMapView;

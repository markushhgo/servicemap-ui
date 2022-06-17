import React from 'react';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';
import RentalCars from '../../components/MobilityPlatform/RentalCars';
import GasFillingStationMarkers from '../../components/MobilityPlatform/GasFillingStationMarkers';
import ChargerStationMarkers from '../../components/MobilityPlatform/ChargerStationMarkers';
import ParkingSpaces from '../../components/MobilityPlatform/ParkingSpaces';
import ParkingChargeZones from '../../components/MobilityPlatform/ParkingChargeZones';
import BikeServiceStations from '../../components/MobilityPlatform/BikeServiceStations';
import SpeedLimitZones from '../../components/MobilityPlatform/SpeedLimitZones';

const MobilityPlatformMapView = () => (
  <>
    <EcoCounterMarkers />
    <BicycleStands />
    <BicycleRoutes />
    <CultureRoutes />
    <RentalCars />
    <GasFillingStationMarkers />
    <ChargerStationMarkers />
    <ParkingSpaces />
    <ParkingChargeZones />
    <BikeServiceStations />
    <SpeedLimitZones />
  </>
);

export default MobilityPlatformMapView;

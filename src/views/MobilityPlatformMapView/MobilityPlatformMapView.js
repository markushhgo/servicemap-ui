import React from 'react';
import EcoCounterMarkers from '../../components/EcoCounter/EcoCounterMarkers';
import BicycleRoutes from '../../components/MobilityPlatform/BicycleRoutes';
import BicycleStands from '../../components/MobilityPlatform/BicycleStands';
import BikeServiceStations from '../../components/MobilityPlatform/BikeServiceStations';
import BoatParking from '../../components/MobilityPlatform/Boating/BoatParking';
import GuestHarbour from '../../components/MobilityPlatform/Boating/GuestHarbour';
import Marinas from '../../components/MobilityPlatform/Boating/Marinas';
import ChargerStationMarkers from '../../components/MobilityPlatform/ChargerStationMarkers';
import CityBikes from '../../components/MobilityPlatform/CityBikes';
import CultureRoutes from '../../components/MobilityPlatform/CultureRoutes';
import GasFillingStationMarkers from '../../components/MobilityPlatform/GasFillingStationMarkers';
import DisabledParking from '../../components/MobilityPlatform/Parking/DisabledParking';
import ParkingChargeZones from '../../components/MobilityPlatform/ParkingChargeZones';
import ParkingSpaces from '../../components/MobilityPlatform/ParkingSpaces';
import PublicToilets from '../../components/MobilityPlatform/PublicToilets';
import RentalCars from '../../components/MobilityPlatform/RentalCars';
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
    <CityBikes />
    <Marinas />
    <BoatParking />
    <GuestHarbour />
    <SpeedLimitZones />
    <PublicToilets />
    <DisabledParking />
  </>
);

export default MobilityPlatformMapView;

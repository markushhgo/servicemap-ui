import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import PaymentZoneContent from './components/PaymentZoneContent';

const PaymentZones = () => {
  const {
    showPaymentZones, showAllPaymentZones, paymentZones, paymentZoneId,
  } = useContext(MobilityPlatformContext);

  const mapType = useSelector(state => state.settings.mapType);

  const paymentZone = paymentZones.find(item => item.id === paymentZoneId);

  const renderAllPaymentZones = !!(showAllPaymentZones && paymentZones && paymentZones.length > 0);

  const renderOnePaymentZone = !!(showPaymentZones && paymentZone && Object.entries(paymentZone).length > 0);

  const { Polygon, Popup } = global.rL;

  const blackOptions = {
    fillColor: 'rgba(0, 0, 0, 255)',
    color: 'rgba(0, 0, 0, 255)',
    fillOpacity: 0.2,
    weight: 5,
  };
  const greenOptions = {
    fillColor: 'rgba(15, 115, 6, 255)',
    color: 'rgba(15, 115, 6, 255)',
    fillOpacity: 0.2,
    weight: 5,
  };
  const purpleOptions = {
    fillColor: 'rgba(202, 15, 212, 255)',
    color: 'rgba(202, 15, 212, 255)',
    fillOpacity: 0.2,
    weight: 5,
  };
  const whiteOptions = { color: 'rgba(255, 255, 255, 255)', fillOpacity: 0, weight: 8 };
  const pathOptions = mapType === 'accessible_map' ? whiteOptions : blackOptions;

  const selectColor = (input) => {
    switch (input) {
      case '1':
        return blackOptions;
      case '2':
        return purpleOptions;
      case '3':
        return greenOptions;
      default:
        return blackOptions;
    }
  };

  const map = useMap();

  useEffect(() => {
    if (showPaymentZones && paymentZone) {
      const bounds = paymentZone.geometry_coords;
      map.fitBounds(bounds);
    }
  }, [showPaymentZones, paymentZone]);

  useEffect(() => {
    if (showAllPaymentZones && paymentZones && paymentZones.length > 0) {
      const bounds = [];
      paymentZones.forEach((item) => {
        bounds.push([item.geometry_coords]);
      });
      map.fitBounds(bounds);
    }
  }, [showAllPaymentZones, paymentZones]);

  return (
    <>
      {renderOnePaymentZone ? (
        <div>
          <Polygon pathOptions={pathOptions} positions={paymentZone.geometry_coords}>
            <Popup>
              <PaymentZoneContent paymentZone={paymentZone} />
            </Popup>
          </Polygon>
        </div>
      ) : null}
      {renderAllPaymentZones
        && paymentZones.map(zone => (
          <Polygon
            key={zone.id}
            pathOptions={mapType === 'accessible_map' ? whiteOptions : selectColor(zone.extra.maksuvyohyke)}
            positions={zone.geometry_coords}
          />
        ))}
    </>
  );
};

export default PaymentZones;

import React, { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import PaymentZoneContent from './components/PaymentZoneContent';

const PaymentZones = () => {
  const {
    showPaymentZones, showAllPaymentZones, paymentZones, paymentZoneId,
  } = useContext(MobilityPlatformContext);

  const paymentZone = paymentZones.find(item => item.id === paymentZoneId);

  const renderAllPaymentZones = !!(showAllPaymentZones && paymentZones && paymentZones.length > 0);

  const renderOnePaymentZone = !!(showPaymentZones && paymentZone && Object.entries(paymentZone).length > 0);

  const { Polygon, Popup } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };
  const greenOptions = { color: 'rgba(15, 115, 6, 255)' };
  const purpleOptions = { color: 'rgba(202, 15, 212, 255)' };

  const selectColor = (input) => {
    switch (input) {
      case '1':
        return blueOptions;
      case '2':
        return purpleOptions;
      case '3':
        return greenOptions;
      default:
        return blueOptions;
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
          <Polygon pathOptions={blueOptions} positions={paymentZone.geometry_coords}>
            <Popup>
              <PaymentZoneContent paymentZone={paymentZone} />
            </Popup>
          </Polygon>
        </div>
      ) : null}
      {renderAllPaymentZones && paymentZones.map(zone => (
        <Polygon key={zone.id} pathOptions={selectColor(zone.extra.maksuvyohyke)} positions={zone.geometry_coords} />
      ))}
    </>
  );
};

export default PaymentZones;

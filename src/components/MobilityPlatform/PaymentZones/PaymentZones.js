import React, { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import PaymentZoneContent from './components/PaymentZoneContent';

const PaymentZones = () => {
  const { showPaymentZones, paymentZones, paymentZoneId } = useContext(MobilityPlatformContext);

  const paymentZone = paymentZones.find(item => item.id === paymentZoneId);

  const { Polygon, Popup } = global.rL;

  const blueOptions = { color: 'rgba(7, 44, 115, 255)' };

  const map = useMap();

  useEffect(() => {
    if (showPaymentZones && paymentZone) {
      const bounds = paymentZone.geometry_coords;
      map.fitBounds(bounds);
    }
  }, [showPaymentZones, paymentZone]);

  return (
    <>
      {showPaymentZones && paymentZone ? (
        <div>
          <Polygon pathOptions={blueOptions} positions={paymentZone.geometry_coords}>
            <Popup>
              <PaymentZoneContent paymentZone={paymentZone} />
            </Popup>
          </Polygon>
        </div>
      ) : null}
    </>
  );
};

export default PaymentZones;

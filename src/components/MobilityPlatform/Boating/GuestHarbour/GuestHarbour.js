import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../../context/MobilityPlatformContext';
import { fetchMobilityMapPolygonData } from '../../mobilityPlatformRequests/mobilityPlatformRequests';

/**
 * Displays quest harbour on the map in polygon format.
 */

const GuestHarbour = () => {
  const [guestHarbourData, setGuestHarbourData] = useState([]);

  const { openMobilityPlatform, showGuestHarbour } = useContext(MobilityPlatformContext);

  const mapType = useSelector(state => state.settings.mapType);

  const { Polygon } = global.rL;

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchMobilityMapPolygonData('GMA', 50, setGuestHarbourData);
    }
  }, [openMobilityPlatform, setGuestHarbourData]);

  const useContrast = mapType === 'accessible_map';

  const blueOptions = { color: 'rgba(7, 44, 115, 255)', weight: 5 };
  const whiteOptions = {
    color: 'rgba(255, 255, 255, 255)', fillOpacity: 0.3, weight: 5, dashArray: '8 2 8',
  };
  const pathOptions = useContrast ? whiteOptions : blueOptions;

  const map = useMap();

  useEffect(() => {
    if (showGuestHarbour && guestHarbourData && guestHarbourData.length > 0) {
      const bounds = [];
      guestHarbourData.forEach((item) => {
        bounds.push(item.geometry_coords);
      });
      map.fitBounds(bounds);
    }
  }, [showGuestHarbour, guestHarbourData, map]);

  return (
    <>
      {showGuestHarbour
        && guestHarbourData
        && guestHarbourData.length > 0
        && guestHarbourData.map(item => (
          <Polygon
            key={item.id}
            pathOptions={pathOptions}
            positions={item.geometry_coords}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: useContrast ? '0.6' : '0.2' });
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: useContrast ? '0.3' : '0.2' });
              },
            }}
          />
        ))}
    </>
  );
};

export default GuestHarbour;

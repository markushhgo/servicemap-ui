import React, { useEffect, useState, useContext } from 'react';
import { useMap } from 'react-leaflet';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import { fetchCityBikesData } from '../mobilityPlatformRequests/mobilityPlatformRequests';
import CityBikesContent from './components/CityBikesContent';
import cityBikeIcon from '../../../../node_modules/servicemap-ui-turku/assets/icons/icons-icon_city_bike.svg';

const CityBikes = () => {
  const [cityBikeStations, setCityBikeStations] = useState([]);
  const [cityBikeStatistics, setCityBikeStatistics] = useState([]);

  const { openMobilityPlatform, showCityBikes } = useContext(MobilityPlatformContext);

  const map = useMap();

  const { Marker, Popup } = global.rL;
  const { icon } = global.L;

  const customIcon = icon({
    iconUrl: cityBikeIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchCityBikesData('CBI', setCityBikeStations);
    }
  }, [openMobilityPlatform, setCityBikeStations]);

  useEffect(() => {
    if (openMobilityPlatform) {
      fetchCityBikesData('CBS', setCityBikeStatistics);
    }
  }, [openMobilityPlatform, setCityBikeStatistics]);

  useEffect(() => {
    if (showCityBikes && cityBikeStations && cityBikeStations.length > 0) {
      const bounds = [];
      cityBikeStations.forEach((item) => {
        bounds.push([item.lat, item.lon]);
      });
      map.fitBounds(bounds);
    }
  }, [showCityBikes, cityBikeStations, map]);

  return (
    <>
      {showCityBikes ? (
        <div>
          <div>
            {cityBikeStations && cityBikeStations.length > 0 ? (
              cityBikeStations.map(item => (
                <Marker
                  key={item.station_id}
                  icon={customIcon}
                  position={[item.lat, item.lon]}
                >
                  <Popup>
                    <CityBikesContent bikeStation={item} cityBikeStatistics={cityBikeStatistics} />
                  </Popup>
                </Marker>
              ))
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CityBikes;

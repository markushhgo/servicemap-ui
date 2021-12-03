import React, { useEffect, useState, useContext } from 'react';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';
import jsonFile from '../../../../node_modules/servicemap-ui-turku/assets/files/maintenance-history.json';
import jsonFile2 from '../../../../node_modules/servicemap-ui-turku/assets/files/maintenance-history-2.json';

const SnowPlows = () => {
  const [snowplowData, setSnowplowData] = useState(null);
  const [sandSpreadingData, setSandSpreadingData] = useState(null);

  const { showMaintenance } = useContext(MobilityPlatformContext);

  const { Polyline } = global.rL;

  const blackOptions = { color: '#000000' };
  const blueOptions = { color: '#0900b5' };
  const whiteOptions = { color: '#ffffff', dashArray: '12' };

  useEffect(() => {
    setSnowplowData(jsonFile.location_history);
  }, [setSnowplowData]);

  useEffect(() => {
    setSandSpreadingData(jsonFile2.location_history);
  }, [setSandSpreadingData]);

  const formatCoords = (inputData) => {
    const locations = [];
    if (inputData !== null) {
      inputData.forEach((item) => {
        const filteredCoords = item.coords.replace(/[{()}]/g, '');
        const coordsArray = filteredCoords.split(' ');
        const reversed = coordsArray.splice(0).reverse();
        locations.push(reversed);
      });
    }
    return locations;
  };

  return (
    <>
      {showMaintenance ? (
        <div>
          <div>
            {snowplowData
          && snowplowData.map(item => (
            <>
              <Polyline
                key={item.timestamp}
                pathOptions={blackOptions}
                weight={8}
                positions={formatCoords(snowplowData)}
              />
              <Polyline
                key={item.timestamp}
                pathOptions={whiteOptions}
                weight={4}
                positions={formatCoords(snowplowData)}
              />
            </>
          ))}
          </div>
          <div>
            {sandSpreadingData
          && sandSpreadingData.map(item => (
            <>
              <Polyline
                key={item.timestamp}
                pathOptions={blueOptions}
                weight={8}
                positions={formatCoords(sandSpreadingData)}
              />
              <Polyline
                key={item.timestamp}
                pathOptions={whiteOptions}
                weight={4}
                positions={formatCoords(sandSpreadingData)}
              />
            </>
          ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SnowPlows;

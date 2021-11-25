import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import jsonFile from 'servicemap-ui-turku/assets/files/bicycle-network-all.json';

const BicycleMainNetwork = ({ showBicycleNetwork }) => {
  const [bicycleNetwork, setBicycleNetwork] = useState(null);

  const { Polyline } = global.rL;

  useEffect(() => {
    setBicycleNetwork(jsonFile.results);
  }, [setBicycleNetwork]);


  return (
    <>
      {showBicycleNetwork ? (
        <div>
          <div>
            {bicycleNetwork
            && bicycleNetwork.map(item => (
              <Polyline key={item.id} weight={4} positions={[item.geometry_coords]} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

BicycleMainNetwork.propTypes = {
  showBicycleNetwork: PropTypes.bool,
};

BicycleMainNetwork.defaultProps = {
  showBicycleNetwork: false,
};

export default BicycleMainNetwork;

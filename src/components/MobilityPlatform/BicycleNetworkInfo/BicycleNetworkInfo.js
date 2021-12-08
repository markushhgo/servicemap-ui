import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import MobilityPlatformContext from '../../../context/MobilityPlatformContext';

const BicycleNetworkInfo = ({ classes }) => {
  const { showBicycleNetwork, showBicycleLocal, showBicycleLanes } = useContext(MobilityPlatformContext);

  return (
    <div className={classes.container}>
      {showBicycleNetwork && (
        <div className={classes.mainRouteInfo}>
          <Typography variant="body2">
            Pääreitit ovat viitoitettuja ja opastettuja seudullisia reittejä. Turusta lähtee 12 seudullista
            pyöräreittiä. Niitä käytetään ensisijaisesti pidempiin pyörämatkoihin.
          </Typography>
        </div>
      )}
      {showBicycleLocal && (
      <div className={classes.mainRouteInfo}>
        <Typography variant="body2">
          Paikallispyöräreitit sisältävät virallisten pyöräteiden lisäksi myös muita pyöräilyyn soveltuvia ajoväyliä,
          kuten viheralueiden hiekkatiet.
        </Typography>
      </div>
      )}
      {showBicycleLanes && (
      <div className={classes.mainRouteInfo}>
        <Typography variant="body2">
          Laatuväylät ovat osa Turun pyöräilyn kehittämisohjelmaa. Niitä käytetään nopeampiin ja pidempiin
          pyörämatkoihin.
        </Typography>
      </div>
      )}
    </div>
  );
};

BicycleNetworkInfo.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BicycleNetworkInfo;

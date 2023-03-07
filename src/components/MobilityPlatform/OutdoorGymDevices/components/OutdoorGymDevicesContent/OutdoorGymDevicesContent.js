import PropTypes from 'prop-types';
import React from 'react';
import TextComponent from '../../../TextComponent';

const OutdoorGymDevicesContent = ({ classes, item }) => {
  const deviceName = {
    fi: item.name_fi,
    en: item.name_en,
    sv: item.name_sv,
  };

  const deviceAddress = {
    fi: item.address_fi,
    en: item.address_en,
    sv: item.address_sv,
  };

  const deviceDescription = {
    fi: item.description_fi,
    en: item.description_en,
    sv: item.description_sv,
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <TextComponent textObj={deviceName} isTitle />
      </div>
      <div className={classes.textContainer}>
        {item.address_fi !== '' ? <TextComponent messageId="mobilityPlatform.content.address" textObj={deviceAddress} /> : null}
        <TextComponent textObj={deviceDescription} />
      </div>
    </div>
  );
};

OutdoorGymDevicesContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.objectOf(PropTypes.any),
};

OutdoorGymDevicesContent.defaultProps = {
  item: {},
};

export default OutdoorGymDevicesContent;
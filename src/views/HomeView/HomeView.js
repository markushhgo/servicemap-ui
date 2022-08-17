import React from 'react';
import PropTypes from 'prop-types';
import { Map } from '@mui/icons-material';
import { SearchBar } from '../../components';
import PaperButton from '../../components/PaperButton';
import { getIcon } from '../../components/SMIcon';
import MobileComponent from '../../components/MobileComponent';
import config from '../../../config';
import NewsInfo from '../../components/NewsInfo';
import { useNavigationParams } from '../../utils/address';
import useLocaleText from '../../utils/useLocaleText';

const HomeView = (props) => {
  const {
    classes, toggleSettings, navigator, userLocation,
  } = props;

  const getLocaleText = useLocaleText();
  const getAddressNavigatorParams = useNavigationParams();

  const renderNavigationOptions = () => {
    const noUserLocation = !userLocation || !userLocation.coordinates || !userLocation.addressData;

    const notFoundText = noUserLocation ? 'location.notFound' : null;
    const subtitleID = userLocation && userLocation.allowed ? notFoundText : 'location.notAllowed';

    let areaSelection = null;

    if (config.showAreaSelection) {
      areaSelection = (
        <PaperButton messageID="home.buttons.area" icon={<Map />} link onClick={() => navigator.push('area')} />
      );
    }

    return (
      <div className={classes.background}>
        <div className={classes.buttonContainer}>
          {areaSelection}
          <PaperButton
            messageID="home.buttons.closeByServices"
            icon={getIcon('location')}
            link
            disabled={noUserLocation}
            onClick={() => {
              navigator.push('address', getAddressNavigatorParams(userLocation.addressData));
            }}
            subtitleID={subtitleID && subtitleID}
          />
          {/* Turku mobility platform settings */}
          <PaperButton
            messageID="home.buttons.mobilityPlatformSettings"
            icon={getIcon('mobilityPlatformIcon')}
            link
            onClick={() => navigator.push('mobilityPlatform')}
          />
          <PaperButton
            messageID="home.buttons.services"
            icon={getIcon('serviceList')}
            link
            onClick={() => navigator.push('serviceTree')}
          />
          <MobileComponent>
            <PaperButton
              messageID="home.buttons.settings"
              icon={getIcon('accessibility')}
              link
              onClick={() => toggleSettings('mobile')}
            />
          </MobileComponent>
          <PaperButton
            messageID="home.send.feedback"
            icon={getIcon('feedback')}
            link
            onClick={() => navigator.push('feedback')}
          />
          <PaperButton
            id="home-paper-info-button"
            messageID="info.title"
            icon={getIcon('help')}
            link
            onClick={() => {
              navigator.push('info', null, 'home-paper-info-button');
            }}
          />
          <PaperButton
            messageID="home.old.link"
            newTab
            icon={<Map />}
            link
            onClick={() => {
              window.open(
                getLocaleText({
                  fi: config.oldMapFi,
                  sv: config.oldMapSv,
                  en: config.oldMapEn,
                }),
              );
            }}
          />
          <NewsInfo showCount={2} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SearchBar hideBackButton header />
      {renderNavigationOptions()}
    </div>
  );
};

export default HomeView;

// Typechecking
HomeView.propTypes = {
  navigator: PropTypes.objectOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleSettings: PropTypes.func.isRequired,
  userLocation: PropTypes.objectOf(PropTypes.any),
};

HomeView.defaultProps = {
  navigator: null,
  userLocation: null,
};

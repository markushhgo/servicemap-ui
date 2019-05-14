/* eslint-disable no-underscore-dangle */
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import HomeView from '../HomeView';
import { DesktopComponent, MobileComponent } from '../../layouts/WrapperComponents/WrapperComponents';

class MobileMapView extends React.Component {

  render() {
    const { intl, map } = this.props;
    if (map && typeof window !== 'undefined') {
      // Reftesh map when changing mobile page initialize correct size
      map._onResize();
    }
    return (
      <>
        <MobileComponent>
          <SearchBar
            placeholder={intl.formatMessage({ id: 'search' })}
          />
        </MobileComponent>
        <DesktopComponent>
          <HomeView />
        </DesktopComponent>
      </>
    );
  }
}

const mapStateToProps = state => ({
  map: state.mapRef.leafletElement,
});


MobileMapView.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  map: PropTypes.objectOf(PropTypes.any),
};

MobileMapView.defaultProps = {
  map: null,
};


export default injectIntl(connect(
  mapStateToProps,
  null,
)(MobileMapView));

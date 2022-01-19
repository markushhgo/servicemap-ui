import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import MobilitySettingsView from './MobilitySettingsView';
import styles from './styles';

const mapStateToProps = (state) => {
  const { navigator } = state;
  return {
    navigator,
  };
};

export default injectIntl(withRouter(withStyles(styles)(connect(
  mapStateToProps,
)(MobilitySettingsView))));
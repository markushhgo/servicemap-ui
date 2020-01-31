import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { setDirection, setOrder } from '../../../redux/actions/sort';
import ResultOrderer from './ResultOrderer';
import styles from './styles';

// Listen to redux state
const mapStateToProps = (state) => {
  const { direction, order } = state.sort;
  const { position } = state.user;

  return {
    direction,
    order,
    userLocation: position.coordinates,
  };
};

export default withStyles(styles)(connect(
  mapStateToProps,
  { setDirection, setOrder },
)(injectIntl(ResultOrderer)));
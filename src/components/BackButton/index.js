import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BackButton from './BackButton';
import styles from './styles';

// Listen to redux state
const mapStateToProps = (state) => {
  const { breadcrumb, navigator } = state;
  return {
    breadcrumb,
    navigator,
  };
};

export default injectIntl(withStyles(styles)(connect(
  mapStateToProps,
  null,
)(BackButton)));

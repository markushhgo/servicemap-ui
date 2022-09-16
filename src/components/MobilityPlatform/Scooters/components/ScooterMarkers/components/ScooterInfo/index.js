import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import ScooterInfo from './ScooterInfo';
import styles from './styles';

export default withStyles(styles)(injectIntl(ScooterInfo));

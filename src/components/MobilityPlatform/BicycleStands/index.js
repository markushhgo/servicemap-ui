import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import BicycleStands from './BicycleStands';
import styles from './styles';

export default withStyles(styles)(injectIntl(BicycleStands));

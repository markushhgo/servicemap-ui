import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import BicycleNetworkInfo from './BicycleNetworkInfo';
import styles from './styles';

export default withStyles(styles)(injectIntl(BicycleNetworkInfo));

import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import RouteLength from './RouteLength';
import styles from './styles';

export default withStyles(styles)(injectIntl(RouteLength));

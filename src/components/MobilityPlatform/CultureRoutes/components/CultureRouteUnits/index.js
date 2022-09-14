import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import CultureRouteUnits from './CultureRouteUnits';
import styles from './styles';

export default injectIntl(withStyles(styles)(CultureRouteUnits));

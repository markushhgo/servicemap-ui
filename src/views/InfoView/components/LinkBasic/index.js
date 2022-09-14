import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import LinkBasic from './LinkBasic';
import styles from './styles';

export default injectIntl(withStyles(styles)(LinkBasic));

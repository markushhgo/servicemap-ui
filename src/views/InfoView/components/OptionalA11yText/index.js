import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import OptionalA11yText from './OptionalA11yText';
import styles from './styles';

export default injectIntl(withStyles(styles)(OptionalA11yText));

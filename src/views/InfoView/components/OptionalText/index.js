import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import OptionalText from './OptionalText';
import styles from './styles';

export default injectIntl(withStyles(styles)(OptionalText));

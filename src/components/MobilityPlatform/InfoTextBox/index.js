import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import InfoTextBox from './InfoTextBox';
import styles from './styles';

export default withStyles(styles)(injectIntl(InfoTextBox));

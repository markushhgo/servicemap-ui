import { withStyles } from '@mui/styles';
import { injectIntl } from 'react-intl';
import ExtendedInfo from './ExtendedInfo';
import styles from './styles';

export default withStyles(styles)(injectIntl(ExtendedInfo));
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import styles from '../../styles/styles';
import Highlights from './Highlights';

export default injectIntl(withStyles(styles)(Highlights));

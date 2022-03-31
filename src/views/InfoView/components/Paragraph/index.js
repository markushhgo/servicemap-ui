import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import Paragraph from './Paragraph';
import styles from './styles';

export default injectIntl(withStyles(styles)(Paragraph));

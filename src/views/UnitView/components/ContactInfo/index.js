import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import styles from '../../styles/styles';
import ContactInfo from './ContactInfo';

export default injectIntl(withStyles(styles)(ContactInfo));

import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import styles from '../../styles';
import GeographicalTab from './GeographicalTab';

export default injectIntl(withStyles(styles)(GeographicalTab));

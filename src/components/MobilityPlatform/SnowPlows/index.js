import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import SnowPlows from './SnowPlows';
import styles from './styles';

export default withStyles(styles)(injectIntl(SnowPlows));

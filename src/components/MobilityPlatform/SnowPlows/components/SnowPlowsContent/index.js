import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import SnowPlowsContent from './SnowPlowsContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(SnowPlowsContent));

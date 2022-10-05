import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import MarinasContent from './MarinasContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(MarinasContent));

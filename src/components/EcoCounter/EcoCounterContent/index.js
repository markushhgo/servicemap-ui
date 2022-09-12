import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import EcoCounterContent from './EcoCounterContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(EcoCounterContent));

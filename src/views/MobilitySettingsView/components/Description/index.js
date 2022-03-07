import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import Description from './Description';
import styles from './styles';

export default withStyles(styles)(injectIntl(Description));

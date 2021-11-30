import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import DescriptionExtraText from './DescriptionExtraText';
import styles from './styles';

export default withStyles(styles)(injectIntl(DescriptionExtraText));

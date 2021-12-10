import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import RentalCarContent from './RentalCarContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(RentalCarContent));

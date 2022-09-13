import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import RentalCarsContent from './RentalCarsContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(RentalCarsContent));

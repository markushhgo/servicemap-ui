import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import ParkingSpacesContent from './ParkingSpacesContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(ParkingSpacesContent));

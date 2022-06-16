import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import ParkingChargeZoneContent from './ParkingChargeZoneContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(ParkingChargeZoneContent));

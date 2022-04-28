import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import PaymentZoneContent from './PaymentZoneContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(PaymentZoneContent));

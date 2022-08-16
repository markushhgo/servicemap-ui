import { withStyles } from '@mui/styles';
import { injectIntl } from 'react-intl';
import BikeServiceStationContent from './BikeServiceStationContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(BikeServiceStationContent));

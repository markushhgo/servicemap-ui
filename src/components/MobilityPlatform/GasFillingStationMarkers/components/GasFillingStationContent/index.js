import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import GasFillingStationContent from './GasFillingStationContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(GasFillingStationContent));

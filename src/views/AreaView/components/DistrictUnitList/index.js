import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import styles from '../../styles';
import DistrictUnitList from './DistrictUnitList';

export default injectIntl(withStyles(styles)(DistrictUnitList));

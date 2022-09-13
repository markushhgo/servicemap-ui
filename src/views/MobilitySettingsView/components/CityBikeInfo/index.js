import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import CityBikeInfo from './CityBikeInfo';
import styles from './styles';

export default withStyles(styles)(injectIntl(CityBikeInfo));

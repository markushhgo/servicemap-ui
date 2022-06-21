import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import CityBikesContent from './CityBikesContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(CityBikesContent));

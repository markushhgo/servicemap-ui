import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import PublicToiletsContent from './PublicToiletsContent';
import styles from './styles';

export default withStyles(styles)(injectIntl(PublicToiletsContent));

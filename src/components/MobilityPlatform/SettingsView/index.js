import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import SettingsView from './SettingsView';
import styles from './styles';

export default withStyles(styles)(injectIntl(SettingsView));

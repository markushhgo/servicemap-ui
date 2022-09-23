import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import styles from './styles';
import TextContent from './TextContent';

export default withStyles(styles)(injectIntl(TextContent));

import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import styles from './styles';
import SuggestionItem from './SuggestionItem';

export default injectIntl(withStyles(styles)(SuggestionItem));

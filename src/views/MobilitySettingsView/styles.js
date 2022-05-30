const styles = theme => ({
  topBarColor: {
    background: theme.palette.background.main,
  },
  buttonWhite: {
    width: '100%',
    justifyContent: 'left',
    textTransform: 'none',
    padding: theme.spacing(1.5),
  },
  button: {
    width: '100%',
    height: '3.125rem',
    background: 'rgba(245, 245, 245, 255)',
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    borderRadius: '0',
    borderTop: 'none',
    borderBottom: '1px solid #000000',
    '&:hover': {
      background: 'rgba(230, 230, 230, 255)',
    },
  },
  active: {
    borderBottom: '1px solid #6f7276',
    borderTop: '1px solid #6f7276',
    background: 'rgba(70, 72, 75, 255)',
    color: '#fff',
    '&:hover': {
      color: '#fff',
      background: '#3e3f42',
      borderBottom: '1px solid #6f7276',
      borderTop: '1px solid #6f7276',
    },
  },
  buttonSmall: {
    width: '35%',
    margin: theme.spacing(1),
    border: '1px solid #000000',
    textTransform: 'none',
  },
  buttonSmallActive: {
    width: '35%',
    margin: theme.spacing(1),
    border: '1px solid #000000',
    textTransform: 'none',
    background: '#46484b',
    color: '#fff',
    '&:hover': {
      color: '#fff',
      background: '#3e3f42',
    },
  },
  toggleText: {
    width: '85%',
    textAlign: 'left',
  },
  formControl: {
    width: '100%',
  },
  formGroup: {
    marginTop: '0',
  },
  formLabel: {
    padding: '0.4rem 3.5rem',
    backgroundColor: 'rgba(70,72,75,255)',
    margin: '0',
    color: '#fff',
  },
  subtitle: {
    textTransform: 'none',
  },
  iconActive: {
    fill: '#fff',
    width: '40px',
    height: '40px',
    marginRight: theme.spacing(1),
  },
  icon: {
    fill: '#000',
    width: '40px',
    height: '40px',
    marginRight: theme.spacing(1),
  },
  paragraph: {
    textAlign: 'left',
    padding: theme.spacing(1.5),
  },
  border: {
    borderBottom: '1px solid #6f7276',
  },
  buttonList: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkBoxContainer: {
    width: '100%',
    borderBottom: '1px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    paddingLeft: theme.spacing(4),
  },
});

export default styles;

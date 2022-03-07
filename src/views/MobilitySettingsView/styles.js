const styles = theme => ({
  topBarColor: {
    background: theme.palette.backgroundTurku.main,
  },
  buttonWhite: {
    width: '100%',
    textAlign: 'left',
    textTransform: 'none',
    padding: theme.spacing(1),
  },
  button: {
    width: '100%',
    height: '50px',
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
  buttonActive: {
    width: '100%',
    height: '50px',
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    borderRadius: '0',
    borderBottom: '1px solid #6f7276',
    borderTop: '1px solid #6f7276',
    background: '#46484b',
    color: '#fff',
    '&:hover': {
      color: '#fff',
      background: '#3e3f42',
      borderBottom: '1px solid #6f7276',
      borderTop: '1px solid #6f7276',
    },
  },
  buttonSmall: {
    width: '100%',
    height: '45px',
    background: 'rgba(230, 230, 230, 255)',
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    borderRadius: '0',
    borderTop: 'none',
    borderBottom: '1px solid #000000',
    '&:hover': {
      background: 'rgba(222, 222, 222, 255)',
    },
  },
  buttonSmallActive: {
    width: '100%',
    height: '45px',
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    borderRadius: '0',
    borderBottom: '1px solid #6f7276',
    borderTop: '1px solid #6f7276',
    background: '#46484b',
    color: '#fff',
    '&:hover': {
      color: '#fff',
      background: '#3e3f42',
      borderBottom: '1px solid #6f7276',
      borderTop: '1px solid #6f7276',
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
});

export default styles;

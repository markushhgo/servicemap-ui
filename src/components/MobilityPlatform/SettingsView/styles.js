export default theme => ({
  container: {
    alignItems: 'center',
    display: 'block',
    height: '100%',
    width: 230,
    marginRight: '0.3rem',
    flex: '0 1 auto',
  },
  button: {
    height: '70px',
  },
  formControl: {
    padding: '0.8rem',
  },
  formGroup: {
    marginTop: '0.5rem',
  },
  subtitle: {
    textTransform: 'capitalize',
  },
  iconRight: {
    marginLeft: 'auto',
    fontSize: 24,
  },
  menuPanel: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: 'inherit',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    backgroundColor: 'white',
    color: 'black',
    zIndex: 2,
    border: `${theme.palette.detail.alpha} solid 0.5px`,
    borderRadius: 4,
  },

  hidden: {
    visibility: 'hidden',
  },
});

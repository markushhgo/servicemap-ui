const styles = {
  button: {
    width: '100%',
    height: '50px',
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    borderRadius: '0',
    border: 'none',
  },
  buttonActive: {
    width: '100%',
    height: '50px',
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    borderRadius: '0',
    border: 'none',
    backgroundColor: '#46484b',
    color: '#fff',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#46484b',
      border: 'none',
    },
  },
  buttonContainer: {
    borderBottom: '1px solid #000000',
  },
  formControl: {
    width: '100%',
  },
  formGroup: {
    marginTop: '0',
  },
  formLabel: {
    padding: '0.4rem 1.5rem',
    backgroundColor: 'rgba(70,72,75,255)',
    margin: '0',
    color: '#fff',
  },
  subtitle: {
    textTransform: 'capitalize',
  },
  iconActive: {
    fill: '#fff',
    width: '40px',
    height: '40px',
    marginRight: '0.8rem',
  },
  icon: {
    fill: '#000',
    width: '40px',
    height: '40px',
    marginRight: '0.8rem',
  },
};

export default styles;

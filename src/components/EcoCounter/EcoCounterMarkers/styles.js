const styles = {
  buttonTransparent: {
    backgroundColor: '#fff',
    border: 'none',
  },
  buttonGray: {
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    padding: '0.3rem',
  },
  buttonWhite: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '0.75rem',
    padding: '0.3rem',
  },
  buttonActive: {
    backgroundColor: 'rgba(54, 54, 56, 255)',
    color: '#fff',
    border: '1px solid gray',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '0.75rem',
    padding: '0.3rem',
  },
  popupWrapper: {
    position: 'absolute',
    textAlign: 'center',
    marginBottom: '20px',
    width: '429px',
  },
  popupInner: {
    borderRadius: '3px',
    marginBottom: '0.4rem',
    marginLeft: '0.6rem',
    lineHeight: 1.2,
    overflowX: 'hidden',
  },
  ecoCounterHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '0.35rem',
    marginBottom: '0.75rem',
    alignItems: 'flex-end',
    borderBottom: '2px solid gray',
    width: '97%',
  },
  headerSubtitle: {
    marginBlockStart: '1rem',
    marginBlockEnd: '0.1rem',
  },
  headerDate: {
    marginLeft: 'auto',
  },
  ecocounterDatePicker: {
    position: 'absolute',
    top: '10%',
    left: '20%',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
};

export default styles;

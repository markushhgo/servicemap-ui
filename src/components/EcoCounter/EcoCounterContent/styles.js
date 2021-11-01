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
    backgroundColor: 'rgba(7, 44, 115, 255)',
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
  ecocounterUserTypes: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '0.3rem',
  },
  buttonAndTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '0.7rem',
    alignItems: 'center',
  },
  textContainer: {
    width: '50px',
  },
  userTypeText: {
    fontWeight: 'bold',
    paddingTop: '0.3rem',
    paddingRight: '0.6rem',
  },
  iconActive: {
    fill: '#fff',
    width: '40px',
    height: '40px',
  },
  icon: {
    fill: '#000',
    width: '40px',
    height: '40px',
  },
  ecocounterSteps: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '1rem 0',
  },
  ecocounterChart: {
    margin: 0,
  },
};

export default styles;

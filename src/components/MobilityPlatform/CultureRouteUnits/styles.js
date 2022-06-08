export default theme => ({
  popupInner: {
    padding: theme.spacing(1.5),
  },
  header: {
    width: '98%',
    marginBottom: theme.spacing(1),
    borderBottom: '1px solid rgba(0, 0, 0, 255)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popupCloseButton: {
    padding: theme.spacing(0.8),
    '&:hover': {
      cursor: 'pointer',
      borderRadius: '5px',
      border: '1px solid rgba(0, 0, 0, 255)',
    },
  },
});

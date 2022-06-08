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
    padding: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
      borderRadius: '5px',
      border: '1px solid rgba(0, 0, 0, 255)',
    },
  },
  closeIcon: {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
    lineHeight: '1.4rem',
  },
});

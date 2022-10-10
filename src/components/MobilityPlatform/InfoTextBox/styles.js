export default theme => ({
  container: {
    padding: theme.spacing(2),
    textAlign: 'left',
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid #6f7276',
  },
  link: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.link.main,
    textDecoration: 'underline',
  },
});

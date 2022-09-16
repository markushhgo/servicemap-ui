export default theme => ({
  container: {
    margin: theme.spacing(1),
  },
  headerContainer: {
    width: '85%',
    borderBottom: '1px solid #000',
    paddingBottom: theme.spacing(0.5),
  },
  textContainer: {
    marginTop: theme.spacing(0.5),
  },
  paragraph: {
    marginTop: theme.spacing(0.4),
  },
  marginTop: {
    marginTop: theme.spacing(0.5),
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: theme.palette.link.main,
    textDecoration: 'underline',
  },
});

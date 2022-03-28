export default theme => ({
  container: {
    whiteSpace: 'pre-line',
    textAlign: 'left',
  },
  buttonContainer: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
  button: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  title: {
    paddingBottom: theme.spacing(0.1),
  },
  text: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
});

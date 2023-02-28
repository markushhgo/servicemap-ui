export default theme => ({
  aTabAdjuster: {
    marginLeft: theme.spacing(1),
  },
  root: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    overflowY: 'auto',
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  bold: {
    fontWeight: 'bold',
  },
  margin: {
    margin: theme.spacing(1),
  },
  label: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  input: {
    marginLeft: 8,
    flex: 1,
    padding: 10,
  },
  iconButton: {
    display: 'flex',
    color: 'inherit',
    flex: '0 1 auto',
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: 0,
    fontSize: '1.125rem',
    marginLeft: theme.spacing(-0.5),
  },
  icon: {
    fontSize: 24,
    margin: 0,
  },
  buttonFocus: {
    outline: '2px solid transparent',
    boxShadow: `0 0 0 4px ${theme.palette.primary.highContrast}`,
  },
  eventIcon: {
    marginRight: theme.spacing(2),
  },
  borderBottom: {
    borderBottom: '1px solid rgba(0,0,0,0.2)',
  },
  link: {
    color: theme.palette.link.main,
    textDecoration: 'underline',
  },
  buttonContainer: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  linkButton: {
    color: 'white',
    textTransform: 'none',
    marginLeft: 'auto',
  },
  linkButtonIcon: {
    fontSize: 24,
    marginLeft: theme.spacing(1.5),
  },
  left: {
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  marginVertical: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paragraph: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    whiteSpace: 'pre-line',
  },
  divider: {
    marginRight: 0,
  },
  dividerShort: {
    marginLeft: theme.spacing(9),
    marginRight: theme.spacing(-2),
  },
  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  imageCaption: {
    width: '100%',
    minHeight: 31,
    fontSize: '0.75rem',
    lineHeight: '15px',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    bottom: 0,
    left: 0,
    color: '#000',
    backgroundColor: '#F0F0F0',
    boxSizing: 'border-box',
    textAlign: 'left',
  },
  fullListContent: {
    height: '100%',
    overflow: 'auto',
  },
  mobileButtonArea: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'end',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  feedbackButton: {
    marginLeft: theme.spacing(2),
  },
  rsButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  accordionItem: {
    padding: 0,
    paddingLeft: theme.spacing(7),
  },
  accordionRoot: {
    height: 32,
    marginBottom: theme.spacing(1),
  },
  accordionSummaryRoot: {
    height: 32,
    minHeight: 32,
  },
  accordionContaianer: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingTop: 0,
  },
  accessibilityLink: {
    paddingTop: theme.spacing(1),
    color: theme.palette.link.main,
  },
  callInfoText: {
    whiteSpace: 'pre-line',
  },
  subgroupItem: {
    marginBottom: theme.spacing(2),
  },
  unitLocationContainer: {
    height: 225,
    position: 'relative',
  },
  mapButton: {
    position: 'absolute',
    right: 16,
    margin: 0,
    top: 16,
    zIndex: 51,
    minHeight: 36,
    borderRadius: '8px',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.75),
  },
  mapContainer: {
    height: '100%',
    pointerEvents: 'none',
  },
});

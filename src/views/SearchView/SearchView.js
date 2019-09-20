/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import {
  Paper, withStyles, Typography, Link, NoSsr, Divider,
} from '@material-ui/core';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from './styles';
import Loading from '../../components/Loading/Loading';
import SearchBar from '../../components/SearchBar';
import { fitUnitsToMap } from '../MapView/utils/mapActions';
import { parseSearchParams } from '../../utils';
import TabLists from '../../components/TabLists';

import Container from '../../components/Container';
import { generatePath } from '../../utils/path';
import { DesktopComponent } from '../../layouts/WrapperComponents/WrapperComponents';
import {
  ColorblindIcon, HearingIcon, VisualImpairmentIcon, getIcon,
} from '../../components/SMIcon';
import ServiceMapButton from '../../components/ServiceMapButton';

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    const { changeSelectedUnit } = props;

    this.state = {
      expandSearch: null,
    };

    // Reset selected unit on SearchView
    if (changeSelectedUnit) {
      changeSelectedUnit(null);
    }
  }

  componentDidMount() {
    const {
      fetchUnits, units, map,
    } = this.props;
    const searchData = this.getSearchParam();
    if (this.shouldFetch()) {
      if (searchData.type === 'search') {
        fetchUnits(searchData.query);
      } else {
        fetchUnits(searchData.query, searchData.type);
      }
      this.focusMap(units, map);
    }
  }

  shouldComponentUpdate(nextProps) {
    const { units, map } = this.props;
    // If new search results, call map focus functio
    if (nextProps.units.length > 0 && units !== nextProps.units) {
      this.focusMap(nextProps.units, map);
    }
    return true;
  }

  // Get search parameter from url
  getSearchParam = () => {
    const {
      location,
    } = this.props;
    const searchParams = parseSearchParams(location.search);
    if (searchParams.q) {
      return { type: 'search', query: searchParams.q };
    } if (searchParams.nodes) {
      return { type: 'node', query: searchParams.nodes };
    }
    return null;
  }

  // Check if view will fetch data because search params has changed
  shouldFetch = () => {
    const { isFetching, previousSearch } = this.props;
    const searchParam = this.getSearchParam().query;
    return !isFetching && searchParam && searchParam !== previousSearch;
  }

  focusMap = (units, map) => {
    if (map && map._layersMaxZoom) {
      fitUnitsToMap(units, map);
    }
  }

  // Group data based on object types
  groupData = (data) => {
    const services = data.filter(obj => obj && obj.object_type === 'service');
    const units = data.filter(obj => obj && obj.object_type === 'unit');

    return {
      services,
      units,
    };
  }

  // Handles redirect if only single result is found
  handleSingleResultRedirect() {
    const {
      units, isFetching, match,
    } = this.props;

    // If not currently searching and view should not fetch new search
    // and only 1 result found redirect directly to specific result page
    if (!isFetching && !this.shouldFetch() && units && units.length === 1) {
      const { id, object_type } = units[0];
      let path = null;
      // Parse language params
      const { params } = match;
      const lng = params && params.lng;

      switch (object_type) {
        case 'unit':
          path = generatePath('unit', lng, { id });
          break;
        case 'service':
          path = generatePath('service', lng, id);
          break;
        default:
      }

      if (path) {
        return <Redirect to={path} />;
      }
    }
    return null;
  }

  /**
   * What to render if no units are found with search
   */
  renderNotFound() {
    const {
      classes, isFetching, previousSearch, units,
    } = this.props;

    // These variables should be passed to this function
    const shouldRender = !isFetching && previousSearch && units && !units.length;
    const messageIDs = ['spelling', 'city', 'service', 'address', 'keyword'];

    return shouldRender && (
      <Container className={classes.noVerticalPadding}>
        <Container className={classes.noVerticalPadding}>
          <Typography align="left" variant="subtitle1" component="p">
            <FormattedMessage id="search.notFoundWith" values={{ query: previousSearch }} />
          </Typography>
        </Container>
        <Divider aria-hidden="true" />
        <Container className={classes.noVerticalPadding}>
          <Typography align="left" variant="subtitle1" component="p">
            <FormattedMessage id="search.tryAgain" />
          </Typography>
          <Typography align="left" variant="body2" component="p">
            <ul className={classes.list}>
              {
                messageIDs.map(id => (
                  <li key={id}>
                    <FormattedMessage id={`search.tryAgainBody.${id}`} />
                  </li>
                ))
              }
            </ul>
          </Typography>
        </Container>
      </Container>
    );
  }

  renderSearchBar() {
    const { intl } = this.props;
    const { expandSearch } = this.state;
    return (
      <SearchBar
        srHideInput={!!expandSearch}
        className="sticky"
        expand
        placeholder={intl && intl.formatMessage({ id: 'search.input.placeholder' })}
        isSticky={0}
        primary
        expandSearch={expandSearch}
        closeExpandedSearch={expandSearch ? () => this.setState({ expandSearch: null }) : () => {}}
      />
    );
  }

  renderSearchInfo = () => {
    const {
      units, settings, classes, isFetching, intl,
    } = this.props;
    const {
      colorblind, hearingAid, mobility, visuallyImpaired, helsinki, espoo, vantaa, kauniainen,
    } = settings;
    const searchParam = this.getSearchParam();

    const unitCount = units && units.length;

    const accessibilitySettings = [
      ...colorblind ? [{ text: intl.formatMessage({ id: 'settings.sense.colorblind' }), icon: <ColorblindIcon /> }] : [],
      ...hearingAid ? [{ text: intl.formatMessage({ id: 'settings.sense.hearing' }), icon: <HearingIcon /> }] : [],
      ...visuallyImpaired ? [{ text: intl.formatMessage({ id: 'settings.sense.visual' }), icon: <VisualImpairmentIcon /> }] : [],
      ...mobility ? [{ text: intl.formatMessage({ id: `settings.mobility.${mobility}` }), icon: getIcon(mobility) }] : [],
    ];

    let citySettings = [
      ...helsinki ? [`"${intl.formatMessage({ id: 'settings.city.helsinki' })}"`] : [],
      ...espoo ? [`"${intl.formatMessage({ id: 'settings.city.espoo' })}"`] : [],
      ...vantaa ? [`"${intl.formatMessage({ id: 'settings.city.vantaa' })}"`] : [],
      ...kauniainen ? [`"${intl.formatMessage({ id: 'settings.city.kauniainen' })}"`] : [],
    ];

    const cityString = citySettings.join(' ');
    const accessibilityString = accessibilitySettings.map(e => e.text).join(' ');

    if (citySettings.length === 4) {
      citySettings = [];
    }

    const infoTextId = searchParam.type === 'search' ? 'search.infoText' : 'search.infoTextNode';

    return (
      <NoSsr>
        {!isFetching && (
          <div align="left" className={classes.searchInfo}>
            <Typography variant="srOnly" component="h3">
              <FormattedMessage id="search.resultInfo" />
            </Typography>
            <div aria-live="polite" aria-label={`${intl.formatMessage({ id: infoTextId }, { count: unitCount })} ${searchParam.query}`} className={classes.infoContainer}>
              <Typography aria-hidden className={`${classes.infoText} ${classes.bold}`}>
                <FormattedMessage id={infoTextId} values={{ count: unitCount }} />
              </Typography>
              <Typography aria-hidden className={classes.infoText}>
                &nbsp;
                {`"${searchParam.query}"`}
              </Typography>
            </div>

            {citySettings.length ? (
              <>
                <div aria-label={`${intl.formatMessage({ id: 'settings.city.info' }, { count: citySettings.length })}: ${cityString}`} className={classes.infoContainer}>
                  <Typography aria-hidden className={`${classes.infoText} ${classes.bold}`}>
                    <FormattedMessage id="settings.city.info" values={{ count: citySettings.length }} />
                    {':'}
                  &nbsp;
                  </Typography>
                  <Typography aria-hidden className={classes.infoText}>
                    {cityString}
                  </Typography>
                </div>
              </>
            ) : null}

            {accessibilitySettings.length ? (
              <div aria-label={`${intl.formatMessage({ id: 'settings.accessibility' })}: ${accessibilityString}`}>
                <Typography aria-hidden className={`${classes.infoSubText} ${classes.bold}`}>
                  <FormattedMessage id="settings.accessibility" />
                  {':'}
                </Typography>
                <div aria-hidden className={classes.infoContainer}>
                  {accessibilitySettings.map(item => (
                    <div key={item.text} className={classes.settingItem}>
                      {item.icon}
                      <Typography className={classes.settingItemText}>{item.text}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {
              !!unitCount
              && searchParam.type === 'search'
              && (
                <ServiceMapButton
                  ref={this.buttonRef}
                  role="link"
                  className={`${classes.suggestionButton}`}
                  onClick={() => this.setState({ expandSearch: searchParam.query })}
                >
                  <Typography variant="button" className={classes.expand}>
                    <FormattedMessage id="search.expand" />
                  </Typography>
                </ServiceMapButton>
              )
            }
          </div>
        )}
      </NoSsr>
    );
  }

  /**
   * Render results
   */
  renderResults() {
    const {
      units, isFetching, intl,
    } = this.props;

    const showResults = !isFetching && units && units.length > 0;

    if (!showResults) {
      return null;
    }

    // Group data
    const groupedData = this.groupData(units);

    // Data for TabLists component
    const searchResults = [
      {
        ariaLabel: `${intl.formatMessage({ id: 'unit.plural' })} ${intl.formatMessage({ id: 'search.results.short' }, {
          count: groupedData
            .units.length,
        })}`,
        component: null,
        data: groupedData.units,
        itemsPerPage: 10,
        title: intl.formatMessage({ id: 'unit.plural' }),
      },
      {
        ariaLabel: `${intl.formatMessage({ id: 'service.plural' })} ${intl.formatMessage({ id: 'search.results.short' }, {
          count: groupedData
            .services.length,
        })}`,
        component: null,
        data: groupedData.services,
        itemsPerPage: 10,
        title: intl.formatMessage({ id: 'service.plural' }),
      },
    ];

    return (
      <TabLists
        data={searchResults}
      />
    );
  }

  /**
   * Render screen reader only information fields
   */
  renderScreenReaderInfo() {
    const { isFetching, max } = this.props;

    return (
      <Typography style={{ position: 'fixed', left: -100 }} aria-live={isFetching ? 'polite' : ''} variant="srOnly" component="h3" tabIndex="-1">
        {
          !isFetching
          && (
            <FormattedMessage id="search.results.title" />
          )
        }
        {
          isFetching && max === 0
          && <FormattedMessage id="search.started" />
        }
        {
          isFetching && max > 0
            && <FormattedMessage id="search.loading.units.srInfo" values={{ count: max }} />
        }
      </Typography>
    );
  }

  render() {
    const {
      classes, isFetching, intl, count, max,
    } = this.props;
    const { expandSearch } = this.state;
    const progress = (isFetching && count) ? Math.floor((count / max * 100)) : 0;

    const redirect = this.handleSingleResultRedirect();

    if (redirect) {
      return redirect;
    }

    // Hide paper padding when nothing is shown
    const paperStyles = {};
    if (!isFetching) {
      paperStyles.padding = 0;
    }


    return (
      <div
        className={classes.root}
      >
        {
          this.renderSearchBar()
        }
        {
          !expandSearch && this.renderSearchInfo()
        }
        <Paper elevation={1} square style={paperStyles}>
          {
            !expandSearch && this.renderScreenReaderInfo()
          }
        </Paper>
        {
          !expandSearch && this.renderResults()
        }
        {
          isFetching
          && <Loading text={intl && intl.formatMessage({ id: 'search.loading.units' }, { count, max })} progress={progress} />
        }
        {
          this.renderNotFound()
        }

        {
          // Jump link back to beginning of current page
        }
        <DesktopComponent>
          <Typography variant="srOnly" component="h3">
            <Link href="#view-title" tabIndex="-1">
              <FormattedMessage id="general.return.viewTitle" />
            </Link>
          </Typography>
        </DesktopComponent>
      </div>
    );
  }
}
export default withRouter(injectIntl(withStyles(styles)(SearchView)));

// Typechecking
SearchView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  changeSelectedUnit: PropTypes.func,
  count: PropTypes.number,
  fetchUnits: PropTypes.func,
  intl: intlShape.isRequired,
  isFetching: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  max: PropTypes.number,
  previousSearch: PropTypes.string,
  units: PropTypes.arrayOf(PropTypes.any),
  map: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any),
};

SearchView.defaultProps = {
  changeSelectedUnit: () => {},
  count: 0,
  fetchUnits: () => {},
  isFetching: false,
  max: 0,
  previousSearch: null,
  units: [],
  settings: null,
  map: null,
};

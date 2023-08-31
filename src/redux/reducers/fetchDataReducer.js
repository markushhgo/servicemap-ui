// Reducers for fetching data sets
const dataSetInitialState = {
  data: [],
  current: null,
  count: 0,
  errorMessage: null,
  isFetching: false,
  max: 0,
  next: null,
  previousSearch: null,
  activeFetches: 0,
};

export const dataSetReducer = (state, action, prefix) => {
  switch (action.type) {
    case `${prefix}_IS_FETCHING`:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        previousSearch: action.search,
        count: 0,
        max: 0,
        next: null,
      };
    case `${prefix}_FETCH_HAS_ERRORED`:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
        count: 0,
        max: 0,
      };
    case `${prefix}_FETCH_DATA_SUCCESS`:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        data: action.data,
        count: action.data ? action.data.length : 0,
      };
    case `${prefix}_FETCH_PROGRESS_UPDATE`:
      return {
        ...state,
        count: action.count,
        max: action.max,
        next: action.next,
      };
    case `${prefix}_FETCH_PROGRESS_UPDATE_CONCURRENT`:
      return {
        ...state,
        count: state.count + action.count,
        max: action.max,
      };
    case `${prefix}_SET_NEW_DATA`:
      return {
        ...state,
        data: action.data,
      };
    case `${prefix}_SET_NEW_CURRENT`:
      return {
        ...state,
        current: action.current,
        errorMessage: null,
        isFetching: false,
        data: [],
      };
    case `${prefix}_ADDITIVE_IS_FETCHING`:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        previousSearch: action.search,
        count: state.activeFetches > 0 ? state.count : 0,
        max: state.activeFetches > 0 ? state.max : 0,
        next: null,
        activeFetches: state.activeFetches + 1,
      };
    case `${prefix}_ADDITIVE_FETCH_PROGRESS_UPDATE`:
      return {
        ...state,
        count: action.count ? state.count + action.count : state.count,
        max: action.max ? state.max + action.max : state.max,
      };
    case `${prefix}_ADDITIVE_FETCH_HAS_ERRORED`:
      return {
        ...state,
        isFetching: state.activeFetches - 1,
        errorMessage: action.errorMessage,
        count: 0,
        max: 0,
        activeFetches: state.activeFetches - 1,
      };
    case `${prefix}_ADDITIVE_FETCH_DATA_SUCCESS`:
      return {
        ...state,
        isFetching: state.activeFetches - 1 > 0,
        errorMessage: null,
        data: [...state.data, ...action.data],
        count: state.activeFetches - 1 > 0 ? state.count : [...state.data, ...action.data].length,
        activeFetches: state.activeFetches - 1,
      };
    default:
      return state;
  }
};
// Reducers for fetching single data
const dataSingleInitialState = {
  isFetching: false,
  errorMessage: null,
  data: null,
  count: 0,
};

const dataSingle = (state, action, prefix) => {
  switch (action.type) {
    case `${prefix}_IS_FETCHING`:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        data: null,
      };
    case `${prefix}_FETCH_HAS_ERRORED`:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      };
    case `${prefix}_FETCH_SUCCESS`:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        data: action.data,
        count: action.count,
        next: action.next,
      };
    case `${prefix}_FETCH_MORE_SUCCESS`:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        data: [...state.data, ...action.data],
        next: action.next,
      };
    case `${prefix}_SET_DATA`:
      return {
        ...state,
        data: action.data,
        count: action.count,
      };
    default:
      return state;
  }
};


// Fetch data set reducers
export const searchResults = (state = dataSetInitialState, action) => dataSetReducer(state, action, 'SEARCH_RESULTS');
export const service = (state = dataSetInitialState, action) => dataSetReducer(state, action, 'SERVICE');
export const statisticalDistrictUnits = (state = dataSetInitialState, action) => dataSetReducer(state, action, 'STATISTICAL_DISTRICT_UNITS');
export const statisticalDistrictServices = (state = dataSetInitialState, action) => dataSetReducer(state, action, 'STATISTICAL_DISTRICT_SERVICES');
export const unitEvents = (state = dataSingleInitialState, action) => dataSetReducer(state, action, 'SELECTED_UNIT_EVENTS');
export const reservations = (state = dataSingleInitialState, action) => dataSetReducer(state, action, 'SELECTED_UNIT_RESERVATIONS');
export const alertNews = (state = dataSingleInitialState, action) => dataSetReducer(state, action, 'ALERT_NEWS');
export const alertErrors = (state = dataSingleInitialState, action) => dataSetReducer(state, action, 'ALERT_ERRORS');

// Fetch data single reducers
export const selectedUnit = (state = dataSingleInitialState, action) => dataSingle(state, action, 'SELECTED_UNIT');
export const accessibilitySentences = (state = dataSingleInitialState, action) => dataSingle(state, action, 'SELECTED_UNIT_ACCESSIBILITY_SENTENCES');
export const hearingMaps = (state = dataSingleInitialState, action) => dataSingle(state, action, 'SELECTED_UNIT_HEARING_MAPS');
export const redirectService = (state = dataSetInitialState, action) => dataSingle(state, action, 'REDIRECT_SERVICE');

import ServiceMapAPI from '../../utils/newFetch/ServiceMapAPI';
import config from '../../../config';

const createSuggestions = (query, abortController, getLocaleText, citySettings, locale) => async () => {
  const smAPI = new ServiceMapAPI();
  smAPI.setAbortController(abortController);

  const additionalOptions = {
    page_size: 10,
    sql_query_limit: 1000,
    unit_limit: 5,
    service_limit: 2,
    address_limit: 1,
    language: locale,
    municipality: citySettings && citySettings.length > 0 ? citySettings.join(',') : config.cities,
  };

  const results = await smAPI.search(query, locale, citySettings, additionalOptions);

  // Handle address results
  results.forEach((item) => {
    if (item.object_type === 'address') {
      if (getLocaleText(item.name).toLowerCase() === query.toLowerCase()) {
        item.isExact = true;
      }
    }
  });

  return results;
};

export default createSuggestions;

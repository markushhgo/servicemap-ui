import { useCallback } from 'react';
import { useSelector } from 'react-redux';

// This returns correct string from text object according to locale
export const getLocaleString = (locale, obj) => {
  // Default rerturned string is the first one listed (probably always finnish)
  let value = obj[Object.keys(obj)[0]];
  Object.keys(obj).forEach((key) => {
    if (key === locale && obj[key]) {
      value = obj[key];
    }
  });
  // Default rerturned string is the first one listed that is not empty string
  if (!value) {
    value = Object.values(obj).find(value => value?.length);
  }
  return value || '';
};

const useLocaleText = () => {
  const locale = useSelector(state => state.user.locale);
  return useCallback(obj => getLocaleString(locale, obj), [locale]);
};

export default useLocaleText;

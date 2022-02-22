/* eslint-disable import/prefer-default-export */

export const getCurrentLocale = (locale, setLocale) => {
  if (['fi', 'en', 'sv'].includes(locale)) {
    setLocale(locale);
  } else setLocale('fi');
};

export const selectRouteName = (locale, routeNameFI, routeNameEN, routeNameSV) => {
  if (locale === 'sv' && routeNameSV) {
    return routeNameSV;
  }
  if (locale === 'en' && routeNameEN) {
    return routeNameEN;
  }
  return routeNameFI;
};
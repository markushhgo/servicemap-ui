/* eslint-disable import/prefer-default-export */

export const getCurrentLocale = (locale, setLocale) => {
  if (locale === 'en') {
    setLocale('en');
  } else if (locale === 'sv') {
    setLocale('sv');
  } else setLocale('fi');
};

export const selectRouteName = (locale, routeNameFI, routeNameEN, routeNameSV) => {
  if (locale === 'sv' && routeNameSV !== null) {
    return routeNameSV;
  }
  if (locale === 'en' && routeNameEN !== null) {
    return routeNameEN;
  }
  return routeNameFI;
};

/* eslint-disable import/prefer-default-export */

export const getCurrentLocale = (locale, setLocale) => {
  if (locale === 'en') {
    setLocale('en');
  } else if (locale === 'sv') {
    setLocale('sv');
  } else setLocale('fi');
};

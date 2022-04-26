const selectRouteName = (locale, routeNameFI, routeNameEN, routeNameSV) => {
  if (locale === 'sv' && routeNameSV) {
    return routeNameSV;
  }
  if (locale === 'en' && routeNameEN) {
    return routeNameEN;
  }
  return routeNameFI;
};

const setLocalizedLink = (locale, setLink, linkUrlSv, linkUrlEn, linkUrlFi) => {
  if (locale === 'sv') {
    setLink(linkUrlSv);
  } else if (locale === 'en') {
    setLink(linkUrlEn);
  } else setLink(linkUrlFi);
};

export {
  selectRouteName,
  setLocalizedLink,
};

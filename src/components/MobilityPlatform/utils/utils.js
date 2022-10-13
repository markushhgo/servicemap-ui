const setLocalizedLink = (locale, setLink, linkUrlSv, linkUrlEn, linkUrlFi) => {
  if (locale === 'sv') {
    setLink(linkUrlSv);
  } else if (locale === 'en') {
    setLink(linkUrlEn);
  } else setLink(linkUrlFi);
};

export default setLocalizedLink;

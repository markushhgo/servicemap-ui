const setLocalizedLink = (locale, setLink, linkUrlSv, linkUrlEn, linkUrlFi) => {
  if (locale === 'sv') {
    setLink(linkUrlSv);
  } else if (locale === 'en') {
    setLink(linkUrlEn);
  } else setLink(linkUrlFi);
};

const createIcon = icon => ({
  iconUrl: icon,
  iconSize: [45, 45],
});

export {
  setLocalizedLink,
  createIcon,
};

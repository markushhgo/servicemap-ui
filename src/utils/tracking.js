import MatomoTracker from '@datapunt/matomo-tracker-js';
import config from '../../config';

const externalTheme = config.themePKG;
const isExternalTheme = !externalTheme || externalTheme === 'undefined' ? null : externalTheme;

const piwik = `https://${config.matomoUrl}/piwik.min.js`;
const matomo = `https://${config.matomoUrl}/matomo.js`;

const matomoTracker = (config.matomoSiteId && config.matomoUrl)
  ? new MatomoTracker({
    urlBase: `https://${config.matomoUrl}`,
    siteId: config.matomoSiteId,
    trackerUrl: `https://${config.matomoUrl}/tracker.php`, // optional, default value: `${urlBase}matomo.php`
    srcUrl: isExternalTheme ? matomo : piwik, // optional, default value: `${urlBase}matomo.js`
    disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    linkTracking: false, // optional, default value: true
  }) : null;

export default matomoTracker;

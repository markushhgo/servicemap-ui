import MatomoTracker from '@datapunt/matomo-tracker-js';
import config from '../../config';

const externalTheme = config.themePKG;
const isExternalTheme = !externalTheme || externalTheme === 'undefined' ? null : externalTheme;

const sourceOptional = `https://${config.matomoUrl}/piwik.min.js`;
const sourceDefault = `https://${config.matomoUrl}/matomo.js`;

const trackerOptional = `https://${config.matomoUrl}/tracker.php`;
const trackerDefault = `https://${config.matomoUrl}/matomo.php`;

const matomoTracker = (config.matomoSiteId && config.matomoUrl)
  ? new MatomoTracker({
    urlBase: `https://${config.matomoUrl}`,
    siteId: config.matomoSiteId,
    trackerUrl: isExternalTheme ? trackerDefault : trackerOptional, // optional, default value: `${urlBase}matomo.php`
    srcUrl: isExternalTheme ? sourceDefault : sourceOptional, // optional, default value: `${urlBase}matomo.js`
    disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    linkTracking: false, // optional, default value: true
  }) : null;

export default matomoTracker;

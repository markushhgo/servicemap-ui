/* eslint-disable max-len */
// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../themes';
import ExtendedInfo from '../index';
import finnishTranslations from '../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  translations: {
    message1: 'mobilityPlatform.info.parkingChargeZones.paragraph.1',
    message2: 'mobilityPlatform.info.parkingChargeZones.paragraph.2',
    message3: 'mobilityPlatform.info.parkingChargeZones.paragraph.3',
    zones: [
      'mobilityPlatform.info.parkingChargeZones.zone.1',
      'mobilityPlatform.info.parkingChargeZones.zone.2',
      'mobilityPlatform.info.parkingChargeZones.zone.3',
    ],
  },
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <IntlProvider {...intlMock}>
    <MuiThemeProvider theme={themes.SMTheme}>{children}</MuiThemeProvider>
  </IntlProvider>
);

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<ExtendedInfo />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<ExtendedInfo {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<ExtendedInfo {...mockProps} />);

    const p = container.querySelectorAll('p');
    const list = container.querySelectorAll('li');
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.paragraph.1']);
    expect(p[4].textContent).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.paragraph.2']);
    expect(p[5].textContent).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.paragraph.3']);
    expect(list[0].textContent).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.zone.1']);
    expect(list[1].textContent).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.zone.2']);
    expect(list[2].textContent).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.zone.3']);
  });

  it('does contain aria-label attributes', () => {
    const { container } = renderWithProviders(<ExtendedInfo {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.paragraph.1']);
    expect(p[1].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.zone.1']);
    expect(p[2].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.zone.2']);
    expect(p[3].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.zone.3']);
    expect(p[4].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.paragraph.2']);
    expect(p[5].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.parkingChargeZones.paragraph.3']);
  });
});

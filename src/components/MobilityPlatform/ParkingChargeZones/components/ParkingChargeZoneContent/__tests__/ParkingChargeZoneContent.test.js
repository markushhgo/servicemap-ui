/* eslint-disable max-len */
// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../../themes';
import ParkingChargeZoneContent from '../index';
import finnishTranslations from '../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  parkingChargeZone: {
    extra: {
      maksuvyohyke: '1',
      maksullisuus_arki: '9 - 18',
      maksullisuus_lauantai: '9 - 15',
      maksullisuus_sunnuntai: 'Maksuton',
      maksuvyohykehinta: '3 €/h',
    },
  },
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <IntlProvider {...intlMock}>
    <MuiThemeProvider theme={themes.SMTheme}>{children}</MuiThemeProvider>
  </IntlProvider>
);

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<ParkingChargeZoneContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<ParkingChargeZoneContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<ParkingChargeZoneContent {...mockProps} />);

    const p = container.querySelectorAll('p');
    const h6 = container.querySelector('h6');
    expect(h6.textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.parkingChargeZones.zone']}: ${mockProps.parkingChargeZone.extra.maksuvyohyke}`,
    );
    expect(p[0].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.parkingChargeZones.price.weekDays']}: ${mockProps.parkingChargeZone.extra.maksullisuus_arki}`,
    );
    expect(p[1].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.parkingChargeZones.price.saturday']}: ${mockProps.parkingChargeZone.extra.maksullisuus_lauantai}`,
    );
    expect(p[2].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.parkingChargeZones.price.sunday']}: ${mockProps.parkingChargeZone.extra.maksullisuus_sunnuntai}`,
    );
    expect(p[3].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.parkingChargeZones.price']}: ${mockProps.parkingChargeZone.extra.maksuvyohykehinta}`,
    );
  });
});

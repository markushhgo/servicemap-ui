// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../../themes';
import GasFillingStationContent from '../index';
import finnishTranslations from '../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  station: {
    name: 'Testinimi',
    address: 'Osoite',
    extra: {
      lng_cng: 'LNG',
      operator: 'Operaattori',
    },
  },
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <IntlProvider {...intlMock}>
    <MuiThemeProvider theme={themes.SMTheme}>
      {children}
    </MuiThemeProvider>
  </IntlProvider>
);

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<GasFillingStationContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<GasFillingStationContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<GasFillingStationContent {...mockProps} />);

    const p = container.querySelectorAll('p');
    const h6 = container.querySelector('h6');
    expect(h6.textContent).toContain(mockProps.station.name);
    expect(p[0].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.address']}: ${mockProps.station.address}`);
    expect(p[1].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.gfsType']}: ${mockProps.station.extra.lng_cng}`);
    expect(p[2].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.operator']}: ${mockProps.station.extra.operator}`);
  });
});

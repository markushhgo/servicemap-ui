// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../themes';
import InfoTextBox from '../index';
import finnishTranslations from '../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  showChargingStations: true,
  infoText: 'mobilityPlatform.info.chargingStations',
  linkUrl: '',
  linkText: '',
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <IntlProvider {...intlMock}>
    <ThemeProvider theme={themes.SMTheme}>{children}</ThemeProvider>
  </IntlProvider>
);

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<InfoTextBox />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<InfoTextBox {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<InfoTextBox {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.info.chargingStations']);
  });

  it('does contain aria-label attribute', () => {
    const { container } = renderWithProviders(<InfoTextBox {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.chargingStations']);
  });
});

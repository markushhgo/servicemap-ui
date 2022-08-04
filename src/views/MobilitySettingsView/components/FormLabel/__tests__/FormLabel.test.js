// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../themes';
import FormLabel from '../index';
import finnishTranslations from '../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  msgId: 'mobilityPlatform.menu.showBicycleStands',
  checkedValue: false,
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <IntlProvider {...intlMock}>
    <ThemeProvider theme={themes.SMTheme}>
      {children}
    </ThemeProvider>
  </IntlProvider>
);

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<FormLabel />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<FormLabel {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<FormLabel {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toEqual('Polkupyöräpysäköinti');
  });

  it('does contain aria-label attribute', () => {
    const { container } = renderWithProviders(<FormLabel {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toEqual('Polkupyöräpysäköinti');
  });
});

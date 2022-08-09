// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import themes from '../../../../../themes';
import RouteLength from '../index';
import { initialState } from '../../../../../redux/reducers/user';
import finnishTranslations from '../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  route: {
    name_fi: 'EuroVelo',
    length: 100000,
  },
};

const mockStore = configureStore([]);

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
  const store = mockStore({
    user: initialState,
    settings: {},
  });

  return (
    <Provider store={store}>
      <IntlProvider {...intlMock}>
        <MuiThemeProvider theme={themes.SMTheme}>
          {children}
        </MuiThemeProvider>
      </IntlProvider>
    </Provider>
  );
};

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<RouteLength />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<RouteLength {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<RouteLength {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(`${finnishTranslations['mobilityPlatform.menu.bicycleRoutes.length']} 100 km.`);
    expect(p[1]).toBeInTheDocument();
  });

  it('does contain aria-label attribute', () => {
    const { container } = renderWithProviders(<RouteLength {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toContain(`${finnishTranslations['mobilityPlatform.menu.bicycleRoutes.length']} 100 km.`);
    expect(p[1].getAttribute('aria-label')).toBeTruthy();
  });
});

// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import themes from '../../../../../../themes';
import BikeServiceStationContent from '../index';
import { initialState } from '../../../../../../redux/reducers/user';
import finnishTranslations from '../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  station: {
    name: 'Testi',
    name_en: 'Test',
    name_sv: 'Test',
    description: 'testikuvaus',
    description_en: 'test description',
    description_sv: 'test beskrivning',
    address: 'testiosoite',
    address_fi: 'osoite',
    address_en: 'address',
    address_sv: 'addres',
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

describe('<BikeServiceStationContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<BikeServiceStationContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<BikeServiceStationContent {...mockProps} />);

    const h6 = container.querySelectorAll('h6');
    const p = container.querySelectorAll('p');
    expect(h6[0].textContent).toEqual(mockProps.station.name);
    expect(p[0].textContent).toEqual(`Osoite: ${mockProps.station.address_fi}`);
    expect(p[1].textContent).toEqual(mockProps.station.description);
  });
});

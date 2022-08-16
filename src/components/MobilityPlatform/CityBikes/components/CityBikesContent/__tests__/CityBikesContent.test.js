// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../../themes';
import CityBikesContent from '../index';
import finnishTranslations from '../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  bikeStation: {
    station_id: 'abc123test',
    name: 'Testiasema',
    capacity: 20,
    is_virtual_station: true,
    rental_uris: {
      android: 'https://www.testilinkki.fi',
      ios: 'https://www.testilinkki.fi',
    },
  },
  cityBikeStatistics: [
    {
      station_id: 'abc123test',
      num_bikes_available: 10,
      num_docks_available: 20,
    },
    {
      station_id: 'abc456test',
      num_bikes_available: 5,
      num_docks_available: 30,
    },
  ],
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

describe('<CityBikesContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<CityBikesContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<CityBikesContent {...mockProps} />);

    const p = container.querySelectorAll('p');
    const h6 = container.querySelector('h6');
    const link = container.querySelectorAll('a');
    expect(h6.textContent).toEqual('Kaupunkipyöräasema');
    expect(p[0].textContent).toEqual(`Asema: ${mockProps.bikeStation.name}`);
    expect(p[1].textContent).toEqual('Virtuaaliasema');
    expect(p[2].textContent).toEqual(`Kapasiteetti: ${mockProps.bikeStation.capacity}`);
    expect(p[3].textContent).toEqual('Pyöriä vapaana: 10');
    expect(p[4].textContent).toEqual('Telineitä vapaana: 20');
    expect(p[5].textContent).toEqual('Latauslinkit:');
    expect(link[0].textContent).toEqual('Android');
    expect(link[1].textContent).toEqual('iOS');
  });
});

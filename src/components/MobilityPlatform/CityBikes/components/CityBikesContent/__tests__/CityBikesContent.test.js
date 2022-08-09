// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
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
    <MuiThemeProvider theme={themes.SMTheme}>
      {children}
    </MuiThemeProvider>
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
    expect(h6.textContent).toContain(finnishTranslations['mobilityPlatform.content.cityBikes.title']);
    expect(p[0].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.cityBikes.name']}: ${mockProps.bikeStation.name}`);
    expect(p[1].textContent).toContain(finnishTranslations['mobilityPlatform.content.cityBikes.virtualStation']);
    expect(p[2].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.cityBikes.capacity']}: ${mockProps.bikeStation.capacity}`);
    expect(p[3].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.cityBikes.bikes.available']}: 10`);
    expect(p[4].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.cityBikes.docks.available']}: 20`);
    expect(p[5].textContent).toContain(finnishTranslations['mobilityPlatform.content.cityBikes.links']);
    expect(link[0].textContent).toEqual('Android');
    expect(link[1].textContent).toEqual('iOS');
  });
});

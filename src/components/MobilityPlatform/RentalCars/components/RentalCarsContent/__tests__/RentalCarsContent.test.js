/* eslint-disable max-len */
// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../../themes';
import RentalCarsContent from '../index';
import finnishTranslations from '../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  car: {
    homeLocationData: {
      fullAddress: 'Testiosoite',
    },
    vehicleModelData: {
      name: 'Testiauto',
      manufacturer: 'Testimerkki',
    },
    availabilityData: {
      available: true,
    },
    link: 'https://www.24rent.fi',
  },
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <IntlProvider {...intlMock}>
    <MuiThemeProvider theme={themes.SMTheme}>{children}</MuiThemeProvider>
  </IntlProvider>
);

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<RentalCarsContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<RentalCarsContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<RentalCarsContent {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0]).toBeInTheDocument();
    expect(p[1].textContent).toEqual(mockProps.car.link);
    expect(p[2].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.rentalCars.carInfo']}: ${mockProps.car.vehicleModelData.manufacturer} ${mockProps.car.vehicleModelData.name}`,
    );
    expect(p[3].textContent).toContain(finnishTranslations['mobilityPlatform.content.rentalCars.available']);
    expect(p[4].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.rentalCars.address']}: ${mockProps.car.homeLocationData.fullAddress}`,
    );
  });

  it('does show link correctly', () => {
    const { container } = renderWithProviders(<RentalCarsContent {...mockProps} />);

    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  it('does show image correctly', () => {
    const { container } = renderWithProviders(<RentalCarsContent {...mockProps} />);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
  });
});

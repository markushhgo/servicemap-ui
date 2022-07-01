// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material';
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
    <ThemeProvider theme={themes.SMTheme}>{children}</ThemeProvider>
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
    expect(p[2].textContent).toEqual(`Auton tiedot: ${mockProps.car.vehicleModelData.manufacturer} ${mockProps.car.vehicleModelData.name}`);
    expect(p[3].textContent).toEqual('Vapaa auto');
    expect(p[4].textContent).toEqual(`Sijainti: ${mockProps.car.homeLocationData.fullAddress}`);
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

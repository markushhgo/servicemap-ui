// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../../themes';
import BicycleStandContent from '../index';
import finnishTranslations from '../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  bicycleStand: {
    name: 'Testinimi',
    extra: {
      model: 'Testimalli',
      number_of_places: 10,
      number_of_stands: 5,
      covered: true,
      hull_lockable: true,
      maintained_by_turku: true,
    },
  },
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

describe('<BicycleStandContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<BicycleStandContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<BicycleStandContent {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.bicycleStands.model']}: ${mockProps.bicycleStand.extra.model}`,
    );
    expect(p[1].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.bicycleStands.numOfPlaces']}: ${mockProps.bicycleStand.extra.number_of_places}`,
    );
    expect(p[2].textContent).toContain(
      `${finnishTranslations['mobilityPlatform.content.bicycleStands.numOfStands']}: ${mockProps.bicycleStand.extra.number_of_stands}`,
    );
    expect(p[3].textContent).toContain(finnishTranslations['mobilityPlatform.content.bicycleStands.covered']);
    expect(p[4].textContent).toContain(finnishTranslations['mobilityPlatform.content.bicycleStands.hullLockable']);
    expect(p[5].textContent).toContain(finnishTranslations['mobilityPlatform.content.bicycleStands.maintainedByTku']);
  });
});

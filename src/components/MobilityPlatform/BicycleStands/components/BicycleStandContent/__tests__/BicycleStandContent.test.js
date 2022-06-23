// Link.react.test.js
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
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
    <MuiThemeProvider theme={themes.SMTheme}>
      {children}
    </MuiThemeProvider>
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
    expect(p[0].textContent).toEqual(`Malli: ${mockProps.bicycleStand.extra.model}`);
    expect(p[1].textContent).toEqual(`Pyöräpaikkojen määrä: ${mockProps.bicycleStand.extra.number_of_places}`);
    expect(p[2].textContent).toEqual(`Pyörätelineiden määrä: ${mockProps.bicycleStand.extra.number_of_stands}`);
    expect(p[3].textContent).toEqual('Pyöräparkki on katettu');
    expect(p[4].textContent).toEqual('Pyörän voi runkolukita');
    expect(p[5].textContent).toEqual('Turun kaupungin ylläpitämä.');
  });
});

// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../../../themes';
import MarinasContent from '../index';
import finnishTranslations from '../../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  name: 'Satama: Marina',
  berths: [{
    Varattavissa: 'Kylla - julkisesti',
    Varaustyyppi: 'Venepaikat',
    HintaAlv0: 100,
    Kohdetyyppi: 'Aisapaikka',
  }],
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

describe('<MarinasContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<MarinasContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<MarinasContent {...mockProps} />);

    const h6 = container.querySelectorAll('h6');
    const p = container.querySelectorAll('p');
    expect(h6[0].textContent).toContain(mockProps.name);
    expect(p[0].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.marinas.vacantSpaces']}: 1`);
    expect(p[1].textContent).toContain(finnishTranslations['mobilityPlatform.content.marinas.typeTitle']);
    expect(p[2].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.marinas.type']}: ${mockProps.berths[0].Kohdetyyppi}`);
    expect(p[3].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.marinas.price']}: 124`);
    expect(p[4].textContent).toContain(finnishTranslations['mobilityPlatform.info.marinas.link']);
  });

  it('does show link correctly', () => {
    const { container } = renderWithProviders(<MarinasContent {...mockProps} />);

    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });
});

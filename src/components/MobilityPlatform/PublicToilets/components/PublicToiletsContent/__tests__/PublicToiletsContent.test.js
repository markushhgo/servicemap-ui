// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../../themes';
import PublicToiletsContent from '../index';
import finnishTranslations from '../../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
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

describe('<PublicToiletsContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<PublicToiletsContent />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<PublicToiletsContent />);

    const p = container.querySelectorAll('p');
    const h6 = container.querySelectorAll('h6');
    expect(h6[0].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.title']);
    expect(h6[1].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openNormalTitle']);
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openNormalDate']);
    expect(p[1].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openNormal']);
    expect(h6[2].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openSummerTitle']);
    expect(p[2].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openSummerDate']);
    expect(p[3].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openSummer']);
  });
});

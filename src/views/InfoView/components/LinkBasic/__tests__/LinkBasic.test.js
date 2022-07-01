// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../themes';
import LinkBasic from '../index';
import finnishTranslations from '../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  linkUrl: 'https://www.turku.fi/feedback',
  translationId: 'info.view.feedback.link',
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

describe('<LinkBasic />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<LinkBasic {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<LinkBasic {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0]).toBeInTheDocument();
  });

  it('does contain aria-label attribute', () => {
    const { container } = renderWithProviders(<LinkBasic {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toBeTruthy();
  });
});

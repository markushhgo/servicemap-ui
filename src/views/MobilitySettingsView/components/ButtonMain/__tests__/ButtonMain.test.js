// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../themes';
import ButtonMain from '../index';
import finnishTranslations from '../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  settingState: false,
  iconName: 'testi',
  translationId: 'mobilityPlatform.menu.title.bicycle',
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

describe('<ButtonMain />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<ButtonMain {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<ButtonMain {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.menu.title.bicycle']);
  });

  it('does contain aria-label attribute', () => {
    const { container } = renderWithProviders(<ButtonMain {...mockProps} />);

    const button = container.querySelectorAll('button');
    expect(button[0].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.menu.title.bicycle']);
  });

  it('simulates click event', () => {
    const mockCallBack = jest.fn();
    const { getByRole } = renderWithProviders(
      <ButtonMain {...mockProps} onClickFunc={mockCallBack} button />,
    );
    fireEvent.click(getByRole('button'));
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

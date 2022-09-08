import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import themes from './src/themes';
import finnish from './src/i18n/fi';

const mockStore = configureStore([]);

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnish,
  wrapRichTextChunksInFragment: false,
};

const Providers = (mockState) => ({ children }) => {
  const store = mockStore(mockState);
  return (
    <Provider store={store}>
      <IntlProvider {...intlMock}>
        <ThemeProvider theme={themes.SMTheme}>
          {children}
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
}

export const getRenderWithProviders = mockState => component => render(component, { wrapper: Providers(mockState) });
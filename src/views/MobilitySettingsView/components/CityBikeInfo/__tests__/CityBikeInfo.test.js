/* eslint-disable max-len */
// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../themes';
import CityBikeInfo from '../index';
import { initialState } from '../../../../../redux/reducers/user';
import finnishTranslations from '../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockStore = configureStore([]);

const mockProps = {
  bikeInfo: {
    paragraph1: 'mobilityPlatform.info.cityBikes.paragraph.1',
    paragraph2: 'mobilityPlatform.info.cityBikes.paragraph.2',
    subtitle: 'mobilityPlatform.info.cityBikes.subtitle',
    link: 'mobilityPlatform.info.cityBikes.link',
    apiInfo: 'mobilityPlatform.info.cityBikes.apiInfo',
    url: {
      fi: 'https://foli.fi/föllärit',
      en: 'https://www.foli.fi/en/f%C3%B6li-bikes',
      sv: 'https://www.foli.fi/sv/fölicyklar',
    },
  },
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
  const store = mockStore({
    user: initialState,
  });

  return (
    <Provider store={store}>
      <IntlProvider {...intlMock}>
        <ThemeProvider theme={themes.SMTheme}>{children}</ThemeProvider>
      </IntlProvider>
    </Provider>
  );
};

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<CityBikeInfo />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<CityBikeInfo {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<CityBikeInfo {...mockProps} />);

    const p = container.querySelectorAll('p');
    const link = container.querySelector('a');
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.paragraph.1']);
    expect(p[1].textContent).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.paragraph.2']);
    expect(p[2].textContent).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.subtitle']);
    expect(link.textContent).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.link']);
    expect(p[4].textContent).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.apiInfo']);
  });

  it('does contain aria-label attributes', () => {
    const { container } = renderWithProviders(<CityBikeInfo {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.paragraph.1']);
    expect(p[1].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.paragraph.2']);
    expect(p[2].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.subtitle']);
    expect(p[3].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.link']);
    expect(p[4].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.cityBikes.apiInfo']);
  });
});

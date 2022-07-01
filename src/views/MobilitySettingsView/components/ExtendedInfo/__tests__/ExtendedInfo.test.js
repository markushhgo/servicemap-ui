/* eslint-disable max-len */
// Link.react.test.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import themes from '../../../../../themes';
import ExtendedInfo from '../index';
import finnishTranslations from '../../../../../i18n/fi';

// Mock props for intl provider
const intlMock = {
  locale: 'fi',
  messages: finnishTranslations,
};

const mockProps = {
  translations: {
    message1: 'mobilityPlatform.info.parkingChargeZones.paragraph.1',
    message2: 'mobilityPlatform.info.parkingChargeZones.paragraph.2',
    message3: 'mobilityPlatform.info.parkingChargeZones.paragraph.3',
    zones: [
      'mobilityPlatform.info.parkingChargeZones.zone.1',
      'mobilityPlatform.info.parkingChargeZones.zone.2',
      'mobilityPlatform.info.parkingChargeZones.zone.3',
    ],
  },
};

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
  return (
    <IntlProvider {...intlMock}>
      <ThemeProvider theme={themes.SMTheme}>{children}</ThemeProvider>
    </IntlProvider>
  );
};

const renderWithProviders = component => render(component, { wrapper: Providers });

describe('<ExtendedInfo />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<ExtendedInfo {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<ExtendedInfo {...mockProps} />);

    const p = container.querySelectorAll('p');
    const list = container.querySelectorAll('li');
    expect(p[0].textContent).toEqual('Turussa on käytössä kolme eri vyöhykettä, joilla on eri tuntimaksut.');
    expect(p[4].textContent).toEqual(
      '3. vyöhyke on voimassa 2. vyöhykkeen rajojen, sekä kaupungin rajojen välisellä alueella.',
    );
    expect(p[5].textContent).toEqual(
      'Maksullisuus määräytyy kuitenkin aina voimassa olevien liikennemerkkien mukaisesti ja koskee Turun kaupungin katutilaa ja kaupungin omia alueita, kuten kauppahallia ja kaupungintaloa.',
    );
    expect(list[0].textContent).toEqual('Ensimmäinen vyöhyke (ydinkeskusta-alue): 3,00 €/tunti');
    expect(list[1].textContent).toEqual('Toinen vyöhyke : 1,50 €/tunti');
    expect(list[2].textContent).toEqual('Kolmas vyöhyke: 0,60 €/tunti');
  });

  it('does contain aria-label attributes', () => {
    const { container } = renderWithProviders(<ExtendedInfo {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toEqual(
      'Turussa on käytössä kolme eri vyöhykettä, joilla on eri tuntimaksut.',
    );
    expect(p[1].getAttribute('aria-label')).toEqual('Ensimmäinen vyöhyke (ydinkeskusta-alue): 3,00 €/tunti');
    expect(p[2].getAttribute('aria-label')).toEqual('Toinen vyöhyke : 1,50 €/tunti');
    expect(p[3].getAttribute('aria-label')).toEqual('Kolmas vyöhyke: 0,60 €/tunti');
    expect(p[4].getAttribute('aria-label')).toEqual(
      '3. vyöhyke on voimassa 2. vyöhykkeen rajojen, sekä kaupungin rajojen välisellä alueella.',
    );
    expect(p[5].getAttribute('aria-label')).toEqual(
      'Maksullisuus määräytyy kuitenkin aina voimassa olevien liikennemerkkien mukaisesti ja koskee Turun kaupungin katutilaa ja kaupungin omia alueita, kuten kauppahallia ja kaupungintaloa.',
    );
  });
});

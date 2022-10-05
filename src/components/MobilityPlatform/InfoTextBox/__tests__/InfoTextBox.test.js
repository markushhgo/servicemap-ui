// Link.react.test.js
import React from 'react';
import InfoTextBox from '../index';
import { getRenderWithProviders } from '../../../../../jestUtils';
import finnishTranslations from '../../../../i18n/fi';

const mockProps = {
  showChargingStations: true,
  infoText: 'mobilityPlatform.info.chargingStations',
  linkUrl: '',
  linkText: '',
};

const renderWithProviders = getRenderWithProviders({});

describe('<InfoTextBox />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<InfoTextBox {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<InfoTextBox {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.info.chargingStations']);
  });

  it('does contain aria-label attribute', () => {
    const { container } = renderWithProviders(<InfoTextBox {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.info.chargingStations']);
  });
});

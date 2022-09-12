// Link.react.test.js
import React from 'react';
import GasFillingStationContent from '../index';
import finnishTranslations from '../../../../../../i18n/fi';
import { getRenderWithProviders } from '../../../../../../../jestUtils';

const mockProps = {
  station: {
    name: 'Testinimi',
    address: 'Osoite',
    extra: {
      lng_cng: 'LNG',
      operator: 'Operaattori',
    },
  },
};

const renderWithProviders = getRenderWithProviders({});

describe('<GasFillingStationContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<GasFillingStationContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<GasFillingStationContent {...mockProps} />);

    const p = container.querySelectorAll('p');
    const h6 = container.querySelector('h6');
    expect(h6.textContent).toContain(mockProps.station.name);
    expect(p[0].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.address']}: ${mockProps.station.address}`);
    expect(p[1].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.gfsType']}: ${mockProps.station.extra.lng_cng}`);
    expect(p[2].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.operator']}: ${mockProps.station.extra.operator}`);
  });
});

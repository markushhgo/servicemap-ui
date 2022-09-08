// Link.react.test.js
import React from 'react';
import BikeServiceStationContent from '../index';
import { initialState } from '../../../../../../redux/reducers/user';
import finnishTranslations from '../../../../../../i18n/fi';
import { getRenderWithProviders } from '../../../../../../../jestUtils';

const mockProps = {
  station: {
    name: 'Testi',
    name_en: 'Test',
    name_sv: 'Test',
    description: 'testikuvaus',
    description_en: 'test description',
    description_sv: 'test beskrivning',
    address: 'testiosoite',
    address_fi: 'osoite',
    address_en: 'address',
    address_sv: 'addres',
  },
};

const renderWithProviders = getRenderWithProviders({
  user: initialState,
});

describe('<BikeServiceStationContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<BikeServiceStationContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<BikeServiceStationContent {...mockProps} />);

    const h6 = container.querySelectorAll('h6');
    const p = container.querySelectorAll('p');
    expect(h6[0].textContent).toEqual(mockProps.station.name);
    expect(p[0].textContent).toEqual(`${finnishTranslations['mobilityPlatform.content.address']}: ${mockProps.station.address_fi}`);
    expect(p[1].textContent).toEqual(mockProps.station.description);
  });
});

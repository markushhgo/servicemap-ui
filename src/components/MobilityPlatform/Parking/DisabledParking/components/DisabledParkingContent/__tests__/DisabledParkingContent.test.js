/* eslint-disable max-len */
// Link.react.test.js
import React from 'react';
import { getRenderWithProviders } from '../../../../../../../../jestUtils';
import finnishTranslations from '../../../../../../../i18n/fi';
import DisabledParkingContent from '../index';

const mockProps = {
  item: {
    extra: {
      invapaikkoja: 5,
    },
  },
};

const renderWithProviders = getRenderWithProviders({});

describe('<DisabledParkingContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<DisabledParkingContent {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<DisabledParkingContent {...mockProps} />);

    const p = container.querySelectorAll('p');
    const h6 = container.querySelector('h6');
    expect(h6.textContent).toContain(finnishTranslations['mobilityPlatform.content.disabledParking.title']);
    expect(p[0].textContent).toContain(`${finnishTranslations['mobilityPlatform.content.disabledParking.amount']}: ${mockProps.item.extra.invapaikkoja}`);
  });
});

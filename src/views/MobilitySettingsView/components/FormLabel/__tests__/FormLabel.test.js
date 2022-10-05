// Link.react.test.js
import React from 'react';
import FormLabel from '../index';
import { getRenderWithProviders } from '../../../../../../jestUtils';
import finnishTranslations from '../../../../../i18n/fi';

const mockProps = {
  msgId: 'mobilityPlatform.menu.showBicycleStands',
  checkedValue: false,
};

const renderWithProviders = getRenderWithProviders({});

describe('<FormLabel />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<FormLabel {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<FormLabel {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.menu.showBicycleStands']);
  });

  it('does contain aria-label attribute', () => {
    const { container } = renderWithProviders(<FormLabel {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].getAttribute('aria-label')).toContain(finnishTranslations['mobilityPlatform.menu.showBicycleStands']);
  });
});

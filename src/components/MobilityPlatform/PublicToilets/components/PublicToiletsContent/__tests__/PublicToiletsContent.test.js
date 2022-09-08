// Link.react.test.js
import React from 'react';
import PublicToiletsContent from '../index';
import { getRenderWithProviders } from '../../../../../../../jestUtils';
import finnishTranslations from '../../../../../../i18n/fi';

const renderWithProviders = getRenderWithProviders({});

describe('<PublicToiletsContent />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<PublicToiletsContent />);
    expect(container).toMatchSnapshot();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<PublicToiletsContent />);

    const p = container.querySelectorAll('p');
    const h6 = container.querySelectorAll('h6');
    expect(h6[0].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.title']);
    expect(h6[1].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openNormalTitle']);
    expect(p[0].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openNormalDate']);
    expect(p[1].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openNormal']);
    expect(h6[2].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openSummerTitle']);
    expect(p[2].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openSummerDate']);
    expect(p[3].textContent).toContain(finnishTranslations['mobilityPlatform.content.publicToilets.openSummer']);
  });
});

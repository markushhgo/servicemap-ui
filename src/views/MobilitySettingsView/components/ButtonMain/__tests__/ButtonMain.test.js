// Link.react.test.js
import React from 'react';
import { fireEvent } from '@testing-library/react';
import ButtonMain from '../index';
import { getRenderWithProviders } from '../../../../../../jestUtils';
import finnishTranslations from '../../../../../i18n/fi';

const mockProps = {
  settingState: false,
  iconName: 'testi',
  translationId: 'mobilityPlatform.menu.title.bicycle',
};

const renderWithProviders = getRenderWithProviders({});

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

// Link.react.test.js
import React from 'react';
import { fireEvent } from '@testing-library/react';
import SMLogo from '../index';
import { initialState } from '../../../../redux/reducers/user';
import { getRenderWithProviders } from '../../../../../jestUtils';
import finnishTranslations from '../../../../i18n/fi';

const renderWithProviders = getRenderWithProviders({
  user: initialState,
  settings: {},
});

describe('<SMLogo />', () => {
  it('should work', () => {
    const { container } = renderWithProviders(<SMLogo />);
    expect(container).toMatchSnapshot();
  });

  it('simulates click event', () => {
    const mockCallBack = jest.fn();
    const { container } = renderWithProviders(
      <SMLogo
        onClick={mockCallBack}
      />,
    );
    fireEvent.click(container.querySelector('button'));
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('does render default accessibility attributes correctly', () => {
    const { container } = renderWithProviders(
      <SMLogo onClick={() => {}} />,
    );
    const buttonBase = container.querySelector('button');
    // Expect role to be link
    expect(buttonBase).toHaveAttribute('role', 'link');
    // Home logo which is image should containe image text in aria label
    // so aria label should contain "Palvelukartta" text in addition to action description
    expect(buttonBase).toHaveAttribute('aria-label', finnishTranslations['general.home.logo.ariaLabel']);
    // Expect visible text to be hidden from screen readers
    expect(buttonBase.querySelector('div')).toHaveAttribute('aria-hidden', 'true');
    expect(buttonBase.querySelector('div')).toHaveAttribute('role', 'img');
  });
});

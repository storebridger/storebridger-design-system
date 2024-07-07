import { render } from '@testing-library/react';

import { Button } from '../index';
import { DefaultTheme } from 'styled-components';

const renderWithTheme = (theme?: DefaultTheme) =>
  render(<Button>button</Button>);

describe('<Button />', () => {
  it('should render a <button> tag', () => {
    const button = renderWithTheme();
    expect(button.container.querySelector('button')).toBeInTheDocument();
  });
});

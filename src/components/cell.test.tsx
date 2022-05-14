import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';


import { Cell } from './cell';

describe('Cell component check', () => {
  
  it('renders correctly', () => {
    const tree = renderer
      .create(<Cell value={1}></Cell>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('Cell render fill', () => {
    const { asFragment } = render(<Cell value={1}></Cell>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell render empty', () => {
    const { asFragment } = render(<Cell value={0}></Cell>);

    expect(asFragment()).toMatchSnapshot();
  });
});
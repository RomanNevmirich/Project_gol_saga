import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { Cell } from './Cell';

describe('Cell component check', () => {
  
  it('Cell render fill', () => {
    const { asFragment } = render(<Cell value={1}></Cell>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell render empty', () => {
    const { asFragment } = render(<Cell value={0}></Cell>);

    expect(asFragment()).toMatchSnapshot();
  });
});
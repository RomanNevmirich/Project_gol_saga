import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { Table, TableType, TableObject } from './Table';

describe('Table component check', () => {
  const table: TableObject = {table: [[0,0,0,0],
                                      [0,1,1,0],
                                      [0,1,1,0],
                                      [0,0,0,0]]};

  it('Table render fill', () => {
    const { asFragment } = render(<Table {...table} />);
    expect(asFragment()).toMatchSnapshot();
  });

});
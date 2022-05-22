import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './Home';
import { HashRouter } from "react-router-dom";

describe('Home component check', () => {
  
  it('Home render', () => {
    const { asFragment } = render(<HashRouter><Home /></HashRouter>);

    expect(asFragment()).toMatchSnapshot();
  });

});
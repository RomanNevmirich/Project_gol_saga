import React from 'react';
import { render } from '@testing-library/react';
import { About } from './About';
import { HashRouter } from "react-router-dom";

describe('About component check', () => {
  
  it('About render', () => {
    const { asFragment } = render(<HashRouter><About /></HashRouter>);

    expect(asFragment()).toMatchSnapshot();
  });

});
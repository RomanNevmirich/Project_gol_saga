import React from 'react';
import { render } from '@testing-library/react';
import { start, stop, clear, generate, Main } from './Main';
import { HashRouter } from "react-router-dom";

describe('Main component check', () => {
  
  it('Main render', () => {
    const { asFragment } = render(<HashRouter><Main /></HashRouter>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Main dispatchers', () => {
    expect(start()).toEqual({"type": "START"});
    expect(stop()).toEqual({"type": "STOP"});
    expect(clear()).toEqual({"type": "CLEAR"});
    expect(generate()).toEqual({"type": "GENERATE"});
  });

});
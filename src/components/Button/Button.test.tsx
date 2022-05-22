import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component check', () => {
    it('Button render', () => {
        const { asFragment } = render(
          <Button
            id='test'
            onClick={() => null}
            label='button'
            primary
            size='small'
          />
        );
        screen.debug();
        expect(asFragment()).toMatchSnapshot();
      });

      it('Button click', () => {
        const onclick = jest.fn();
        render(
          <Button id='test' onClick={onclick} label='label' primary />
        );
        const button = screen.getByTestId('test');
        fireEvent.click(button);
        expect(onclick).toBeCalled();
      });

      it('Button label', () => {
        render(
          <Button
            id='test'
            onClick={() => null}
            label='button1'
            primary
            size='small'
          />
        );
        const button = screen.getByTestId('test');
        console.log(button.textContent);
        expect(button.textContent === 'button1').toBe(true);
      });
});
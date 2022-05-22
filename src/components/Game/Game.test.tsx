import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { render, fireEvent, screen } from "@testing-library/react";
import { Game, GameParams } from "./Game";
import { Table, TableType } from '../Table';

describe('Game component check suite', () => {
    const eventHandler = jest.fn();
    const props: GameParams = {
      table: [[0, 1]],
      running: false,
      start: eventHandler,
      stop: eventHandler,
      generate: eventHandler,
      clear: eventHandler
    }
    it('render', () => {
        const { asFragment } = render(
            <Game {...props} />
        );
        screen.debug();
        expect(asFragment()).toMatchSnapshot();
    });

    it('check', () => {
      expect(Game(props)).not.toBe(null);
    });

    it('event call start', () => {
      render(<Game {...props} />);
      const start = screen.getByTestId('go');
      fireEvent.click(start);
      expect(props.start).toBeCalled();
    });

    it('event call clear', () => {
      render(<Game {...props} />);
      const clear = screen.getByTestId('clear');
      fireEvent.click(clear);
      expect(props.clear).toBeCalled();
    });

    it('event call generate', () => {
      render(<Game {...props} />);
      const generate = screen.getByTestId('generate');
      fireEvent.click(generate);
      expect(props.generate).toBeCalled();
    });
});
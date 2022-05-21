import React, { FC, useCallback } from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from './store';
import { GENERATE, START, STOP, CLEAR } from './game';
import { Game } from './components/Game';

const start = () => store.dispatch({ type: START });
const stop = () => store.dispatch({ type: STOP });
const clear = () => store.dispatch({ type: CLEAR });
const generate = () => store.dispatch({ type: GENERATE });

const App: FC = () => {
    //const start = useCallback(() => store.dispatch({ type: START }), []);
    //console.log(1);
    return <Provider store={store}>
        <Game {...store.getState()}
            start={start}
            stop={stop}
            clear={clear}
            generate={generate}
        />
    </Provider>
};

const rootElement: HTMLElement = document.getElementById('root') ?? document.createElement('');
const root = createRoot(rootElement);

export function render() {
  root.render(<App/>);
}
import React, { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from '../../store';
import { GENERATE, START, STOP, CLEAR } from '../../game';
import { Game } from '../Game';
import { Link, useNavigate } from "react-router-dom";

export const start = () => store.dispatch({ type: START });
export const stop = () => store.dispatch({ type: STOP });
export const clear = () => store.dispatch({ type: CLEAR });
export const generate = () => store.dispatch({ type: GENERATE });

export const Main = () => {
    //const start = useCallback(() => store.dispatch({ type: START }), []);
    /*const navigate = useNavigate();
    const navigateTo = useCallback(() => navigate('/'), []);
    <Button id='home' label='Home' onClick={navigateTo} primary size='small' />*/
    return <>
        <nav>
            <Link to="/">Home</Link>
            <p/>
        </nav>
        <Provider store={store}>
            <Game {...store.getState()}
                start={start}
                stop={stop}
                clear={clear}
                generate={generate}
            />
        </Provider>
    </>
};
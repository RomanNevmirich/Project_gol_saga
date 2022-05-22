import React from 'react';
import "regenerator-runtime/runtime";
import { store } from "./store";
import { render } from './App';
import './index.css'

render();

//TODO: переделать на рендер только компоненты игры
store.subscribe(render);

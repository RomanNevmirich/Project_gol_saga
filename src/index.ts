import React from 'react';
import "regenerator-runtime/runtime";
import { store } from "./store";
import { render } from './App';

render();
store.subscribe(render);
import React, { createContext, useCallback, useState, useRef, useReducer } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware, compose, Reducer } from 'redux';
import createSagaMiddleware, { EventChannel, eventChannel, Task } from 'redux-saga';
import { take, put, call, CallEffect, AllEffect, ForkEffect, TakeEffect, SimpleEffect, fork, cancel, cancelled, race } from "redux-saga/effects";
import Cell from './components/cell';

//import { store, sagaMiddleware } from './store';

const numRows = 50;
const numColumns = 50;
const timerMs = 50;
const nearOps = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

export type TableType = (0|1)[][];

const generateTable = (empty: boolean) => {
  const rows = [];
  for (let r = 0; r < numRows; r++) {
    rows.push(Array.from(Array(numColumns), () => empty ? 0 : Math.random() >= 0.9 ? 1 : 0));
  }
  return rows;
}

export const generateNextGen = ( table: TableType ): TableType => {
  const newTable: TableType = JSON.parse(JSON.stringify(table));
  const rowsCount = newTable.length;
  const colsCount = newTable[0]?.length ?? 0;
  for (let r = 0; r < rowsCount; r++) {
    for (let c = 0; c < colsCount; c++) {
      let nearCount = 0;
      nearOps.forEach(([x, y]) => {
        const newR = r + x;
        const newC = c + y;
        if (newR >= 0 && newC >= 0 && newR < rowsCount && newC < colsCount) {
          nearCount += table[newR][newC];
        }
      })
      if (nearCount < 2 || nearCount > 3) {
        newTable[r][c] = 0;
      } else if (table[r][c] === 0 && nearCount === 3) {
        newTable[r][c] = 1;
      }
    }
  };
  return newTable;
}

//Actions
const GENERATE = "GENERATE";
const CLEAR = "CLEAR";
const START = "START";
const STOP = "STOP";
const NEXT_GENERATION = "NEXT_GENERATION";

//Reducers
const initialState = {
  table: generateTable(false),
  running: false
};

//tableReducer
type Action = {
  type: string;
};

const table: Reducer<TableType> = (state = initialState.table, action: Action) => {
  switch (action.type) {
    case GENERATE:
      return generateTable(false);
    case CLEAR:
      return generateTable(true);
    case NEXT_GENERATION:
      return generateNextGen(state);
    default:
      return state;
  }
};

//Running reducer
const running: Reducer<boolean> = (state = initialState.running, action: Action) => {
  switch (action.type) {
    case CLEAR:
      return false;
    case START:
      return true;
    case STOP:
      return false;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  table,
  running
});

// Store
export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);

// Saga
function timer() {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter(timerMs);
    }, timerMs);
    return () => {
      clearInterval(iv);
    };
  });
}

function* timerSaga(): Generator<any> {
  const chan: EventChannel<number> = (yield call(timer)) as EventChannel<number>;
  try {
    while (true) {
      yield take(chan);
      yield put({ type: NEXT_GENERATION });
    }
  } finally {
    if (yield cancelled) {
      chan.close();
    }
  }
}

function* rootSaga(): Generator<any> {
  while (yield take(START)) {
    const asyncTask: Task = (yield fork(timerSaga)) as Task;
    yield race([ take(STOP),
                 take(CLEAR) ]);
    yield cancel(asyncTask);
  }
}

sagaMiddleware.run(rootSaga);

//Game
type TableObject = {
  table: TableType;
};

const Table = ( table: TableObject) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${numColumns}, 12px)`}}>
    {table.table.map((rows, i) => rows.map(
      (col, j) => 
        <Cell key={`${i}|${j}`} value={table.table[i][j]}/>
      )
    )}
  </div>
);

const TestTable = ( table: TableType) => {
  return (
  <div>{JSON.stringify(table)}</div>
)
};

export type ActionExecutor = () => void;

export type GameParams = {
  table: TableType,
  running: boolean,
  start: ActionExecutor,
  stop: ActionExecutor,
  generate: ActionExecutor,
  clear: ActionExecutor
}
const Game = (data: GameParams
) => (
  <div>
    <button onClick={data.running ? data.stop : data.start}>
      {data.running ? "stop" : "start"}
    </button>
    <button onClick={data.clear}>clear</button>
    <button onClick={data.generate}>generate</button>
    <Table table={data.table} />
  </div>
);

const rootElement: HTMLElement = document.getElementById('root') ?? document.createElement('');
const root = createRoot(rootElement);

export function renderGame() {
  root.render(
    <Game
      table={store.getState().table}
      running={store.getState().running}
      start={() => store.dispatch({ type: START })}
      stop={() => store.dispatch({ type: STOP })}
      clear={() => store.dispatch({ type: CLEAR })}
      generate={() => store.dispatch({ type: GENERATE })}
    />
  );
}

export default Game;